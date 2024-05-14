import { github, lucia } from '~/auth/lucia';
import { cookies } from 'next/headers';
import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize, Lucia } from 'lucia';
import { db } from '~/server/db';
import { profiles } from 'db/schema/profiles';
import { eq, and } from 'drizzle-orm';
import { type NewUser, Session, User } from '~/definition/auth';
import { NextResponse } from 'next/server';
import { setSession } from '~/auth/setSession';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('github_oauth_state')?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    const url = new URL('/login', request.url);
    url.searchParams.set('error', 'Oauth Error! Invalid state. Please try logging in again');
    return Response.redirect(url);
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch('https://api.github.com/user', {
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
          Location: '/',
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

    const emails = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }).then((res) => res.json());

    if (Array.isArray(emails)) {
      const primaryEmail = emails.filter(
        (email: { email: string; primary: boolean; verified: boolean; visibility: boolean }) => email.primary
      )[0];
      if (primaryEmail?.verified) {
        const existingDatabaseUserWithEmail = await db
          .select()
          .from(profiles)
          .where(and(eq(profiles.email, primaryEmail.email), eq(profiles.email_verified, true)))
          .limit(1);
        if (existingDatabaseUserWithEmail.length > 0) {
          await db
            .update(profiles)
            .set({ github_id: String(githubUser.id) })
            .where(eq(profiles.id, existingDatabaseUserWithEmail[0]!.id));
          await setSession(existingDatabaseUserWithEmail[0]!.id);
          const url = new URL('/', request.url);
          url.searchParams.set('action', 'Linked to account with email ' + primaryEmail.email);
          return Response.redirect(url);
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
        Location: '/',
      },
    });
  } catch (e) {
    const url = new URL('/login', request.url);
    url.searchParams.set('error', `Oauth Error! ${(e as any).toString()} Please try logging in again`);
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

interface GitHubUser {
  id: string;
  login: string;
  avatar_url: string;
}
