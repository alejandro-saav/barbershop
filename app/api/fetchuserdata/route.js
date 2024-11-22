// pages/api/session.js
import { cookies } from "next/headers";
import { lucia } from "../../lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return NextResponse.json(null, { status: 401 });
    }

    const user = await lucia.validateSession(sessionId);
    console.log(user);
    if (!user.session) {
      return NextResponse.json(null, { status: 401 });
    }

    // Return the user details, including the role
    // const user = await lucia.getUser(result.session.userId);
    return NextResponse.json(
      { correo: user.user.correo, role: user.user.role },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, { status: 500 });
  }
  // const validateRequest = cache(
  //   async () => {
  //     const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  //     if (!sessionId) {
  //       return {
  //         user: null,
  //         session: null,
  //       };
  //     }

  //     const result = await lucia.validateSession(sessionId);
  //     // next.js throws when you attempt to set cookie when rendering page
  //     try {
  //       if (result.session && result.session.fresh) {
  //         const sessionCookie = lucia.createSessionCookie(result.session.id);
  //         cookies().set(
  //           sessionCookie.name,
  //           sessionCookie.value,
  //           sessionCookie.attributes
  //         );
  //       }
  //       if (!result.session) {
  //         const sessionCookie = lucia.createBlankSessionCookie();
  //         cookies().set(
  //           sessionCookie.name,
  //           sessionCookie.value,
  //           sessionCookie.attributes
  //         );
  //       }
  //     } catch {}
  //     return result;
  //   }
  // );
}
