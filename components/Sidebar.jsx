// import Link from "next/link";

import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <Link href="/Dashboard/Admin" className="text-2xl font-bold p-4">
        Admin Panel
      </Link>
      <nav className="flex-1">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/Dashboard/Admin/Hotels/">Hotels</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/Dashboard/Admin/Appartments/">Appartments</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/Dashboard/User/">Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
