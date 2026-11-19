import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en"],
  defaultLocale: "en",
});

const isTestRoute = (pathname: string) => /^\/(en\/)?test(\/|$)/.test(pathname);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // In production, /test and everything under it redirects to "/".
  // TODO: Fix. This routes should return notfound().
  if (isTestRoute(pathname)) {
    if (process.env.NODE_ENV === "production")
      return NextResponse.redirect(new URL("/", request.url));

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

// noinspection JSUnusedGlobalSymbols
export const config = {
  // Everything except API routes, Next internals and files with an extension
  // (robots.txt, sitemap.xml, manifest.webmanifest, images...).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
