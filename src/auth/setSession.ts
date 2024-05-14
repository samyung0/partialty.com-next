import { cookies } from 'next/headers';
import { lucia } from './lucia';

export const setSession = async (id: string) => {
  const session = await lucia.createSession(id, {
    // not used, result of lucia auth v2
    user_id: id,
    active_expires: 0n,
    idle_expires: 0n,
  });
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
};
