import 'server-only';
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type User = {
  sub: string;
  roles: string;
};
const cookieSecret =
  process.env.COOKIE_SECRET;
const ttl = 60 * 60 * 24 * 7;

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<{ token: string }>(cookieStore, {
    password: cookieSecret,
    cookieName: "auth",
    ttl,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: (ttl === 0 ? 2147483647 : ttl) - 60,
      path: "/",
    },
  });
}

export async function saveSession(token: string) {
    const session = await getSession();
    session.token = token;
    await session.save();
}

export async function destroySession() {
    const session = await getSession();
    session.destroy();
}

export async function getUser(): Promise<User | null> {
    const session = await getSession();

    if (!session.token) {
        return null;
    }

    return jwt.decode(session.token) as unknown as User;
}