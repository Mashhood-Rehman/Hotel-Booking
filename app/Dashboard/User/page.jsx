"use client";
import AdminLayout from "../../../components/AdminLayout";

import { useEffect, useState } from "react";

const Page = () => {
  const [Page, setPage] = useState([]);

  useEffect(() => {
    // Fetch Page from the database (placeholder API call)
    fetch("/api/Page")
      .then((res) => res.json())
      .then((data) => setPage(data));
  }, []);

  const deleteUser = (id) => {
    // Placeholder for DELETE request
    fetch(`/api/Page/${id}`, { method: "DELETE" }).then(() =>
      setPage(Page.filter((user) => user.id !== id))
    );
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Users</h1>
      <p className="text-gray-600 mb-4">Manage all Users from here.</p>
      {/* Add table or hotel-related components here */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <a
          href="/Dashboard/Admin/Hotels/Add"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </a>
      </div>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Page.map((user) => (
            <tr key={hotel.id} className="border-b">
              <td className="p-4">{user.id}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">
                <a
                  href={`/admin/Page/edit?id=${user.id}`}
                  className="text-blue-500 mr-4"
                >
                  Edit
                </a>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Page;
