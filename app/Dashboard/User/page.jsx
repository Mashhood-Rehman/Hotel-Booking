"use client";
import axios from "axios";
import AdminLayout from "../../../components/AdminLayout";

import { useEffect, useState } from "react";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user");
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>
      {error && <p className="text-red-500">{error}</p>} {/* Display error */}
      <table className="w-full  bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
          </tr>
        </thead>
        <tbody className="">
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Page;
