export { default } from "next-auth/middleware";

import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function middleware(req: any) {
  const session = await getSession({ req });

  // Only apply middleware logic to specific routes without query params
  if (
    req.nextUrl.pathname.startsWith("/jobs/") ||
    req.nextUrl.pathname.startsWith("/myjobs/")
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
  }

  // Continue with the response if no redirect occurred
  return NextResponse.next();
}

export const config = {
  matcher: ["/jobs/:path*", "/myjobs/:path*"],
};
