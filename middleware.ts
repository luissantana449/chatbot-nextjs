import { NextResponse, NextRequest } from "next/server"; // Importe NextRequest
import { getToken } from "next-auth/jwt"; // Importa a função para obter o token
import { privateRoutes } from "./app/utils/privateRoutes";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;

  // if (!token && privateRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL("/auth/signin", req.url));
  // }
  // if (req.nextUrl.pathname !== "/chat") {
  //   return NextResponse.redirect(new URL("/chat", req.url));
  // }

  // if (
  //   pathname.startsWith("/_next") || // Arquivos estáticos do Next.js
  //   pathname.startsWith("/api") || // APIs
  //   pathname.includes(".") // Arquivos estáticos (CSS, imagens, etc.)
  // ) {
  //   return NextResponse.next();
  // }

  // if (pathname === "/*") {
  //   return NextResponse.redirect(new URL("/chat", req.url));
  // }

  // if (token && pathname === "/auth/signin") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  // matcher: [...privateRoutes, "/auth/signin"],
  matcher: "/:path*",
};
