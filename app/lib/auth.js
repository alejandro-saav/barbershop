import { Lucia } from "lucia";
import { PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";
// import { sql } from "@vercel/postgres";
// import { db } from "@vercel/postgres";
import postgres from "postgres";
// import { webcrypto } from "crypto";

// globalThis.crypto = webcrypto;
const sql = postgres(process.env.POSTGRES_URL);
const adapter = new PostgresJsAdapter(sql, {
  user: "user",
  session: "session",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "development",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      correo: attributes.correo,
      role: attributes.role,
    };
  },
});

export async function validateRequest(req, res) {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }
  const result = await lucia.validateSession(sessionId);
  if (result.session && result.session.fresh) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createSessionCookie(result.session.id).serialize()
    );
  }
  if (!result.session) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize()
    );
  }
  return result;
}
