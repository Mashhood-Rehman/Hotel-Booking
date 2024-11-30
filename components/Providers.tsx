"use client";
// components/Providers.jsx
import { SessionProvider } from "next-auth/react";
import Navbar from "./(Header)/Navbar";
import Footer from "@/app/Footer/page";

const Providers = ({ children }) => {
  return (
    <SessionProvider>
      <Navbar />
      {children}
      <Footer />
    </SessionProvider>
  );
};

export default Providers;
