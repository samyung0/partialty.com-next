import { lucia } from "~/auth/lucia";

export type Session = Awaited<ReturnType<typeof lucia.validateSession>>
export type User = Session["user"]