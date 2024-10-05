import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/note'];
const publicRoutes = ['/sign-in', '/'];

export const middleware = async (req: NextRequest) => {
    try {
        const session = await auth();
        const { pathname } = req.nextUrl;

        if (!pathname) {
            return NextResponse.next();
        }

        const isProtectedRoute = protectedRoutes.includes(pathname);
        const isPublicRoute = publicRoutes.includes(pathname);

        if (isProtectedRoute && !session) {
            return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
        }

        if (isPublicRoute && session?.user?.name && !pathname.startsWith('/note')) {
            return NextResponse.redirect(new URL('/note', req.nextUrl));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.redirect(new URL('/error', req.nextUrl));
    }
};

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
