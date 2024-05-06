import "server-only";

import { generateIdFromEntropySize } from "lucia";
import {
  SignupFormCombinedSchema,
  SignupFormCombinedState,
} from "~/definition/profiles";
import { LibsqlError } from "@libsql/client/web";
import { db } from "../db";
import { profiles } from "db/schema/profiles";
import { lucia } from "~/auth/lucia";
import { cookies } from "next/headers";

export const createUser = async (
  state: SignupFormCombinedState,
  formData: FormData,
): Promise<SignupFormCombinedState> => {
  const validatedFields = SignupFormCombinedSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formErrors: validatedFields.error.flatten().formErrors,
      success: false,
    };
  }

  const passwordHash = (await fetch(
    "https://api.partialty.com/signup/passwordToHash",
    {
      method: "POST",
      body: JSON.stringify({
        password: validatedFields.data.password,
        time: Date.now(),
      }),
    },
  ).then((hash) => hash.json())) as string;
  const userId = generateIdFromEntropySize(10);

  try {
    await db.insert(profiles).values({
      id: userId,
      password: passwordHash,
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
      success: true
    }
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
