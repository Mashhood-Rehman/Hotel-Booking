// app/_app.tsx
import { useSession } from "next-auth/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session?.user.role);
  useEffect(() => {
    if (status === "loading") return;

    if (session?.user?.role === "ADMIN" && router.pathname !== "/admin") {
      router.push("/admin");
    } else if (session?.user?.role === "USER" && router.pathname !== "/") {
      router.push("/");
    }
  }, [status, session, router]);

  return <Component {...pageProps} />;
}
