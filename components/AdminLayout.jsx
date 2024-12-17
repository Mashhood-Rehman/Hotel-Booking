import { getServerSession } from "next-auth";
import Sidebar from "./Sidebar";
import { authOptions } from "@/lib/auth";

const AdminLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <p className="flex items-center justify-center font-semibold text-xl p-4">
        Log In Please!
      </p>
    );
  }

  if (session.user?.role !== "ADMIN") {
    return (
      <h1 className="flex items-center justify-center font-semibold text-xl p-4">
        You cannot access Admin Panel
      </h1>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};

export default AdminLayout;
