"use client";
import React from "react";
import { motion } from "framer-motion";
import { navdData } from "../../app/Helpers/Data";
import Link from "next/link";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 ${
          isOpen ? "visible" : "invisible"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
        className="fixed top-0 right-0 w-2/3 md:w-1/4 h-full bg-black text-white z-30 shadow-lg"
      >
        <div className="p-4 flex justify-end">
          {/* Close Button */}
          <button onClick={toggleSidebar} className="text-white text-2xl">
            &times;
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-full">
          {/* Navigation Links */}
          {navdData.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="py-4 px-6 text-lg text-white hover:text-[#c4a053] transition-colors"
              onClick={toggleSidebar}
            >
              {item.name}
            </Link>
          ))}

          {/* Call-to-Action Button */}
          <div className="mt-6">
            <Link href="/Contact">
              <motion.button
                className="bg-[#c4a053] px-6 py-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
