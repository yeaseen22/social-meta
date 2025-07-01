// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  console.log(accessToken, "middleware");

  const { pathname } = req.nextUrl;

  const publicPaths = ["/login", "/register"];
  const isPublic = publicPaths.includes(pathname);

  // 🔐 Redirect unauthenticated users trying to access protected routes
  if (!accessToken && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🚫 Redirect authenticated users away from public pages
  if (accessToken && isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|static|.*\\..*).*)"],
};
