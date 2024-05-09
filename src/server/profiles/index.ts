"use server";

import { generateIdFromEntropySize, Session, User } from "lucia";
import {
  SignupFormCombinedSchema,
  SignupFormCombinedState,
} from "~/definition/signup";
import { LibsqlError } from "@libsql/client/web";
import { db } from "../db";
import { profiles } from "db/schema/profiles";
import { lucia } from "~/auth/lucia";
import { cookies } from "next/headers";
import { LoginFormSchema, LoginFormState } from "~/definition/login";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { cache } from "react";
import { redirect } from "next/navigation";

export const createUser = async (
  values: z.infer<typeof SignupFormCombinedSchema>,
): Promise<SignupFormCombinedState> => {
  const validatedFields = SignupFormCombinedSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formErrors: validatedFields.error.flatten().formErrors,
      success: false,
    };
  }

  const passwordHash = (await fetch(
    "https://api.partialty.com/auth/signup/passwordToHash",
    {
      method: "POST",
      body: JSON.stringify({
        password: validatedFields.data.password,
        time: Date.now(),
      }),
    },
  ).then((hash) => hash.json())) as {
    success: boolean;
    data?: string;
    message?: string;
  };
  if (!passwordHash.success)
    return {
      formErrors: [passwordHash.message ?? ""],
      success: false,
    };

  const userId = generateIdFromEntropySize(10);

  try {
    await db.insert(profiles).values({
      id: userId,
      password: passwordHash.data,
      email: validatedFields.data.email,
      nickname: validatedFields.data.nickname,
      // TODO: avatar_url
      avatar_url: "",
      email_verified: false,
    });

    const session = await lucia.createSession(userId, {
      user_id: userId,

      // not used, result of lucia auth v2
      active_expires: 0n,
      idle_expires: 0n,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
    };
  } catch (e) {
    if (e instanceof LibsqlError) {
      if (
        e.message.includes("UNIQUE constraint failed: user_key.id") ||
        e.message.includes("UNIQUE constraint failed: profiles.email")
      )
        return { formErrors: [`Error! User already exists`], success: false };
    }
    return {
      formErrors: [
        "An unkown error occured! Error: " + (e as Error).toString(),
      ],
      success: false,
    };
  }
};

export const login = async (
  values: z.infer<typeof LoginFormSchema>,
): Promise<LoginFormState> => {
  try {
    const validatedFields = LoginFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        formErrors: validatedFields.error.flatten().formErrors,
        success: false,
      };
    }

    const existingUser = (
      await db
        .select()
        .from(profiles)
        .where(eq(profiles.email, validatedFields.data.email))
    )[0];

    console.log(
      JSON.stringify({
        password: validatedFields.data.password,
        hash: existingUser?.password ?? "",
        time: Date.now(),
      }),
    );

    const passwordVerification = (await fetch(
      "https://api.partialty.com/auth/login/hashToPassword",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          password: validatedFields.data.password,
          hash: existingUser?.password ?? "",
          time: Date.now(),
        }),
      },
    ).then((hash) => hash.json())) as {
      error: boolean;
      isVerified: boolean;
      message?: string;
    };

    if (!existingUser) {
      // NOTE:
      // Returning immediately allows malicious actors to figure out valid usernames from response times,
      // allowing them to only focus on guessing passwords in brute-force attacks.
      // As a preventive measure, you may want to hash passwords even for invalid usernames.
      // However, valid usernames can be already be revealed with the signup page among other methods.
      // It will also be much more resource intensive.
      // Since protecting against this is non-trivial,
      // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
      // If usernames are public, you may outright tell the user that the username is invalid.
      return {
        success: false,
        formErrors: ["Incorrect email or password"],
      };
    }

    if (passwordVerification.error || !passwordVerification.isVerified) {
      return {
        formErrors: [passwordVerification.message ?? ""],
        success: false,
      };
    }

    const session = await lucia.createSession(existingUser.id, {
      user_id: existingUser.id,

      // not used, result of lucia auth v2
      active_expires: 0n,
      idle_expires: 0n,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (e) {
    return {
      formErrors: [
        "An unkown error occured! Error: " + (e as Error).toString(),
      ],
      success: false,
    };
  }
};

export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return user;
});

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
    return result;
  },
);

export const logout = async () => {
  const { session } = await validateRequest();
  if (!session) {
    throw new Error("Unauthorized!");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/")
};
