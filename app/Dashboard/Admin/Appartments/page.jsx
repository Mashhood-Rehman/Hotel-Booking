"use client";
import AdminLayout from "@/app/Components/AdminLayout";
import { useState, useEffect } from "react";

const Page = () => {
  const [appartments, setAppartments] = useState([]);

  useEffect(() => {
    // Fetch appartments from the database (placeholder API call)
    fetch("/api/appartments")
      .then((res) => res.json())
      .then((data) => setHotels(data));
  }, []);

  const deleteHotel = (id) => {
    // Placeholder for DELETE request
    fetch(`/api/hotels/${id}`, { method: "DELETE" }).then(() =>
      setAppartments(appartments.filter((appartments) => appartments.id !== id))
    );
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Appartments</h1>
      <p className="text-gray-600 mb-4">Manage all appartments from here</p>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appartments</h1>
        <a
          href="/Dashboard/Admin/Appartments/Add"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Appartment
        </a>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appartments.map((hotel) => (
            <tr key={hotel.id} className="border-b">
              <td className="p-4">{appartments.id}</td>
              <td className="p-4">{appartments.name}</td>
              <td className="p-4">
                <a
                  href={`/admin/hotels/edit?id=${appartments.id}`}
                  className="text-blue-500 mr-4"
                >
                  Edit
                </a>
                <button
                  onClick={() => deleteHotel(appartments.id)}
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
