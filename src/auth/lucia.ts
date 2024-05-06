import { GitHub, Google } from "arctic";
import { Lucia, TimeSpan } from "lucia";
import { LibSQLAdapter } from "@lucia-auth/adapter-sqlite";
import { client } from "~/server/db";

import { type NewProfile } from "db/schema/profiles";
import { type New_user_session } from "db/schema/user_session";

const adapter = new LibSQLAdapter(client, {
  user: "profiles",
  session: "user_session",
});

export const lucia = new Lucia(adapter, {
  getUserAttributes: (user) => {
    return {
      email: user.email,
      phone: user.phone,
      role: user.role,
      stripe_id: user.stripe_id,
      created_at: user.created_at,
      username: user.username,
      avatar_url: user.avatar_url,
      github_id: user.github_id,
      google_id: user.google_id,
      nickname: user.nickname,
      email_verified: !!user.email_verified,
      accessible_courses: user.accessible_courses,
      accessible_courses_read: user.accessible_courses_read,
    };
  },
  getSessionAttributes: (session) => {
    return {
      created_at: session.created_at,
    };
  },
  sessionExpiresIn: new TimeSpan(2, "w"),
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export const github = new GitHub(
  process.env.GITHUB_ID!,
  process.env.GITHUB_SECRET!,
  {
    redirectURI:
      process.env.NODE_ENV === "production"
        ? "https://www.partialty.com/login/github/callback/"
        : "http://localhost:5173/login/github/callback/",
  },
);

export const google = new Google(
  process.env.GOOGLE_ID!,
  process.env.GOOGLE_SECRET!,
  process.env.NODE_ENV === "production"
    ? "https://www.partialty.com/login/google/callback/"
    : "http://localhost:5173/login/google/callback/",
);

// export const githubAuth = (env: RequestEvent["env"]) => {
//   return google(lucia, {
//     clientId: env.get("GOOGLE_ID")!,
//     clientSecret: env.get("GOOGLE_SECRET")!,
//     scope: ["email"],
//     redirectUri:
//       import.meta.env.MODE === "production"
//         ? "https://www.partialty.com/login/google/callback/"
//         : "http://localhost:5173/login/google/callback/",
//   });
// };

// export const googleAuth = (env: RequestEvent["env"]) => {
//   return github(lucia, {
//     clientId: env.get("GITHUB_ID")!,
//     clientSecret: env.get("GITHUB_SECRET")!,
//     scope: ["user"],
//     redirectUri:
//       import.meta.env.MODE === "production"
//         ? "https://www.partialty.com/login/github/callback/"
//         : "http://localhost:5173/login/github/callback/",
//   });
// };

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<NewProfile, "id">;
    DatabaseSessionAttributes: Omit<New_user_session, "id">;
  }
}
