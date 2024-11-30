"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { navdData } from "@/app/Helpers/Data";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log(status);
  console.log(session);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [bgColor, setBgColor] = useState("bg-black");
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        if (window.innerWidth >= 1140) {
          if (window.scrollY > 50) {
            setBgColor("bg-black");
          } else {
            setBgColor("bg-transparent");
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div
      className={`relative ${bgColor} sticky duration-300 ease-in-out top-0 z-50 `}
    >
      <nav className="bg-transparent px-4 lg:px-16 py-3 lg:py-4  flex items-center justify-between">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/Mainlogo (1).png"
              className=" "
              alt="lvh pic"
              height={100}
              width={100}
            />
          </Link>
        </div>

        <ul className="hidden md:flex justify-between items-center">
          {navdData.map((item, index) => (
            <li key={index} className="relative text-white mx-4 group">
              <Link
                href={item.href}
                className="relative z-10 hover:text-blue-600"
              >
                {item.name}
              </Link>
              <div className="underline"></div>
            </li>
          ))}
        </ul>
        {session ? (
          <div>
            <h1 className=" text-white">{session.user.name} </h1>
            <button
              className=" hidden lg:block hover:scale-110 duration-300 ease-in-out bg-red-600 text-white py-2 px-4"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <Link href="/SignIn">
              <button className=" hidden lg:block hover:scale-110 duration-300 ease-in-out bg-blue-600 text-white py-2 px-4">
                SignIn
              </button>
            </Link>
          </div>
        )}
        <div className="md:hidden flex items-center ">
          <button onClick={toggleSidebar} className="text-white p-2">
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
          </button>
        </div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;
