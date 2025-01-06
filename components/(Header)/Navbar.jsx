"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navdData } from "@/app/Helpers/Data";
import { signOut, useSession } from "next-auth/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data: session, status } = useSession();
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

  useEffect(() => {}, [status, session]);

  return (
    <div>
      <div
        className={`${bgColor} duration-500 ease-in-out flex fixed z-50  items-center justify-between w-full p-12`}
      >
        <button
          onClick={toggleSidebar}
          className="text-white p-3 rounded-full focus:outline-none z-50"
        >
          {isSidebarOpen ? (
            <span className="text-2xl">&times;</span>
          ) : (
            <>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
            </>
          )}
        </button>

        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src="/logo.jpeg"
              alt="Logo"
              height={100}
              width={100}
              className="mx-auto"
            />
          </Link>
        </div>
        <div></div>
      </div>

      {/* Sidebar */}
      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{
          x: isSidebarOpen ? 0 : "-100%",
          opacity: isSidebarOpen ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
        className="fixed top-0 left-0 w-screen h-full bg-black text-white z-40 shadow-lg flex items-center justify-center lg:items-center lg:justify-center"
      >
        <div className="p-6 lg:p-0 space-y-10 text-center">
          {/* Navigation Links */}
          <ul className="space-y-4 mt-24 lg:mt-0 grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 items-center justify-center">
            {navdData.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="block text-lg lg:text-4xl font-thin hover:text-[#c4a053] transition-colors"
                  onClick={toggleSidebar}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Section */}
          <div className="mt-10">
            {session ? (
              <div className="group relative flex flex-col items-center">
                <Image
                  src={session.user.image || "/default-avatar.png"}
                  alt="User Profile Image"
                  height={50}
                  width={50}
                  className="rounded-full transition-all duration-300 ease-in-out"
                />
                <div
                  className={`absolute top-12 bg-gray-800 text-white rounded-lg p-2 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100`}
                >
                  <h1 className="text-white">{session.user.name}</h1>
                  <div className="flex items-center space-x-2">
                    {/* Icon for Sign-Out */}
                    <button
                      className="flex items-center space-x-2 hover:text-red-500"
                      onClick={signOut}
                    >
                      <Icon icon="mdi:logout" width={20} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href="/AccountSettings"
                      className="flex items-center space-x-2 hover:text-red-500"
                    >
                      <Icon icon="mdi:settings" width={20} />
                      <span>Settings</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Link href="/SignIn">
                  <button className="hidden lg:block hover:scale-110 duration-300 ease-in-out bg-[#c4a053] rounded-r-xl w-32 text-white py-2 px-4">
                    Sign In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
