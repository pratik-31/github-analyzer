import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export async function middleware(req) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.redirect(
        new URL(
          "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F",
          req.url
        )
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
export const config = {
  matcher: ["/", "/repos/(.*), /api/user/(.*)"],
};
