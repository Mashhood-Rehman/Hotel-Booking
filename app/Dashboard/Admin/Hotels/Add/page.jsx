"use client";
// pages/admin/hotels/add.jsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../../components/AdminLayout";

const Page = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const addHotel = (e) => {
    e.preventDefault();
    // Placeholder for POST request
    fetch("/api/hotels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }).then(() => router.push("/admin/hotels"));
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Add Hotel</h1>
      <form onSubmit={addHotel} className="bg-white shadow rounded p-6">
        <div className="mb-4">
          <label className="block text-gray-700">Hotel Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add Hotel
        </button>
      </form>
    </AdminLayout>
  );
};

export default Page;
