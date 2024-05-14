import { type NewProfile } from 'db/schema/profiles';
import { type lucia } from '~/auth/lucia';

type SessionObj = Awaited<ReturnType<typeof lucia.validateSession>>;
export type User = SessionObj['user'];
export type Session = SessionObj['session'];
export type NewUser = NewProfile;
