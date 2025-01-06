// middleware.js
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function middleware() {
  const session = await getServerSession(authOptions);
  console.log(session.user.name);
  if (!session || !session.user) {
    console.log("No session found or session is invalid");
    return;
  }

  console.log("Session found:", session.user);
}

export const config = {
  matcher: "/Dashboard/Admin",
};
