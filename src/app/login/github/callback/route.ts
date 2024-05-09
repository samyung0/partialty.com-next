import { github, lucia } from "~/auth/lucia";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize, Lucia } from "lucia";
import { db } from "~/server/db";
import { profiles } from "db/schema/profiles";
import { eq, and } from "drizzle-orm";
import { NewUser, Session, User } from "~/definition/auth";

const setSession = async (id: string) => {
  const session = await lucia.createSession(id, {
    user_id: id,

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
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    // Replace this with your own DB client.
    const existingUser = (
      await db
        .select()
        .from(profiles)
        .where(eq(profiles.github_id, String(githubUser.id)))
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
      github_id: String(githubUser.id),
      nickname: githubUser.login,
      avatar_url: githubUser.avatar_url,
    };

    const emails = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }).then((res) => res.json());

    if (Array.isArray(emails)) {
      const primaryEmail = emails.filter(
        (email: {
          email: string;
          primary: boolean;
          verified: boolean;
          visibility: boolean;
        }) => email.primary,
      )[0];
      if (primaryEmail?.verified) {
        const existingDatabaseUserWithEmail = await db
          .select()
          .from(profiles)
          .where(
            and(
              eq(profiles.email, primaryEmail.email),
              eq(profiles.email_verified, true),
            ),
          )
          .limit(1);
        if (existingDatabaseUserWithEmail.length > 0) {
          await db
            .update(profiles)
            .set({ github_id: String(githubUser.id) })
            .where(eq(profiles.id, existingDatabaseUserWithEmail[0]!.id));
          await setSession(existingDatabaseUserWithEmail[0]!.id);
          return new Response(null, {
            status: 302,
            headers: {
              Location: "/",
            },
          });
        } else {
          attributes.email = primaryEmail.email;
          attributes.email_verified = true;
        }
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
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  id: string;
  login: string;
  avatar_url: string;
}
