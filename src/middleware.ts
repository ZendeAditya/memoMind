import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/sign-in" || path === "/" || path.startsWith("/api/");

  const session = await auth();

  if (path === "/") {
    if (session) {
      return NextResponse.redirect(new URL("/note", request.url));
    } else {
      return NextResponse.next();
    }
  }

  if (path === "/sign-in") {
    if (session) {
      return NextResponse.redirect(new URL("/note", request.url));
    } else {
      return NextResponse.next();
    }
  }

  if (path === "/note" && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
