"use client";
import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import { useEffect, useState } from "react";
import Image from "next/image";

const Page = () => {
  const [hotel, setHotel] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/adminSearch?type=hotel");
        setHotel(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Hotel Management</h1>
      <p className="text-gray-600 mb-4">Manage all Hotels from here.</p>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotels</h1>
        <a
          href="/Dashboard/Admin/Hotels/Add"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Hotel
        </a>
      </div>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            {/* <th className="p-4 text-left">ID</th> */}
            <th className="p-4 text-left">Picture</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">City</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotel.map((hotel) => (
            <tr key={hotel.id} className="border-b">
              {/* <td className="p-4">{hotel.id}</td> */}
              <td className="p-4">
                <Image
                  src={hotel.picture}
                  width={100}
                  height={100}
                  alt="hotels pictures"
                  className="rounded-md"
                />
              </td>
              <td className="p-4">{hotel.city}</td>
              <td className="p-4">{hotel.name}</td>
              <td className="p-4">
                <a
                  href={`/admin/Page/edit?id=${hotel.id}`}
                  className="text-blue-500 mr-4"
                >
                  Edit
                </a>
                <button
                  onClick={() => deleteHotel(hotel.id)}
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
