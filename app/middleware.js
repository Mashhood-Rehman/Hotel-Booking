import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export async function middleware(req) {
  const session = await getServerSession(authOptions);

  console.log("Session:", session.user.email);

  if (!session || !session.user) {
    console.log("No session or user, redirecting to /SignIn");
    return NextResponse.redirect(new URL("/SignIn", req.url));
  }

  if (session.user.email == "mashhoodbutt47@gmail.com") {
    console.log("Insufficient role, redirecting to /unauthorized");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  console.log("Access granted");
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/Dashboard/Admin",
    "/Dashboard/User",
    "/Dashboard/Admin/Appartments",
    "/Dashboard/Admin/Hotels",
  ],
};
