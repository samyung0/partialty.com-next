import { github, google, lucia } from "~/auth/lucia";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize, Lucia } from "lucia";
import { db } from "~/server/db";
import { profiles } from "db/schema/profiles";
import { eq, and } from "drizzle-orm";
import { NewUser, Session, User } from "~/definition/auth";
import { NextResponse } from "next/server";
import { setSession } from "~/auth/setSession";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const storedCodeVerifier =
    cookies().get("google_code_verifier")?.value ?? null;
  if (
    !code ||
    !state ||
    !storedCodeVerifier ||
    !storedState ||
    state !== storedState
  ) {
    const url = new URL("/login", request.url);
    url.searchParams.set(
      "error",
      "Oauth Error! Invalid state. Please try logging in again",
    );
    return Response.redirect(url);
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const googleUser = (await response.json()) as GoogleUser;

    if (!googleUser.sub) throw new Error("Cannot find google account ID!");

    // Replace this with your own DB client.
    const existingUser = (
      await db
        .select()
        .from(profiles)
        .where(eq(profiles.google_id, String(googleUser.sub)))
    )[0];

    if (existingUser) {
      await setSession(existingUser.id);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = generateIdFromEntropySize(10); // 16 characters long

    const attributes: NewUser = {
      id: userId,
      google_id: String(googleUser.sub),
      nickname: googleUser.name,
      avatar_url: googleUser.picture,
      email_verified: !!googleUser.email_verified,
      email: googleUser.email || null,
    };
    if (googleUser.email && googleUser.email_verified) {
      const existingDatabaseUserWithEmail = await db
        .select()
        .from(profiles)
        .where(
          and(
            eq(profiles.email, googleUser.email),
            eq(profiles.email_verified, true),
          ),
        )
        .limit(1);
      if (existingDatabaseUserWithEmail.length > 0) {
        await db
          .update(profiles)
          .set({ google_id: String(googleUser.sub) })
          .where(eq(profiles.id, existingDatabaseUserWithEmail[0]!.id));
        await setSession(existingDatabaseUserWithEmail[0]!.id);
        const url = new URL("/", request.url);
        url.searchParams.set(
          "action",
          "Linked to account with email " + googleUser.email,
        );
        return Response.redirect(url);
      }
    }
    await db.insert(profiles).values(attributes);
    await setSession(userId);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    const url = new URL(request.url);
    url.searchParams.set(
      "error",
      `Oauth Error! ${(e as any).toString()} Please try logging in again`,
    );
    return Response.redirect(url);
    // the specific error message depends on the provider
    // if (e instanceof OAuth2RequestError) {
    //   // invalid code
    //   throw new Error(e.toString());
    //   // return new Response(null, {
    //   //   status: 400,
    //   // });
    // }
    // throw new Error(e);
    // return new Response(null, {
    //   status: 500,
    // });
  }
}

interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
