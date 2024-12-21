"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SettingsLayout({ children }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [sidebarWidth, setSidebarWidth] = useState(250);

  const handleMouseDown = (e) => {
    const startX = e.clientX;

    const onMouseMove = (moveEvent) => {
      const newWidth = sidebarWidth + (moveEvent.clientX - startX);
      setSidebarWidth(Math.max(newWidth, 150));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  if (!session) {
    return (
      <>
        <p className=" text-xl font-semibold flex items-center justify-center p-4">
          You are not logged In !
        </p>
        <Link href="/SignIn" className="     flex items-center justify-center ">
          <button className=" px-6 py-2 mb-2 bg-blue-600 rounded-lg text-white ">
            Click here to Login
          </button>
        </Link>
      </>
    );
  }
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className="bg-gray-100 p-4 overflow-y-auto"
        style={{ width: sidebarWidth }}
        id="sidebar"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
        <ul className="space-y-3">
          <li>
            <Link
              href="/AccountSettings"
              className={`block p-2 rounded ${
                pathname === "/AccountSettings"
                  ? "bg-blue-600 text-white"
                  : "text-black"
              }`}
            >
              Account Settings
            </Link>
          </li>
          <li>
            <Link
              href="/HelpSupport"
              className={`block p-2 rounded ${
                pathname === "/HelpSupport"
                  ? "bg-blue-600 text-white"
                  : "text-black"
              }`}
            >
              Help & Support
            </Link>
          </li>
        </ul>
        {/* Resize handle */}
        <div
          className="w-2 bg-gray-400 cursor-ew-resize absolute top-0 right-0 h-full"
          onMouseDown={handleMouseDown}
        />
      </div>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
