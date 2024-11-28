// pages/admin/hotels/edit.jsx
import Admin from "../../../../components/AdminLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditHotel = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Fetch current hotel details (placeholder API call)
    if (id) {
      fetch(`/api/hotels/${id}`)
        .then((res) => res.json())
        .then((data) => setName(data.name));
    }
  }, [id]);

  const updateHotel = (e) => {
    e.preventDefault();
    // Placeholder for PUT request
    fetch(`/api/hotels/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }).then(() => router.push("/admin/hotels"));
  };

  return (
    <Admin>
      <h1 className="text-2xl font-bold mb-6">Edit Hotel</h1>
      <form onSubmit={updateHotel} className="bg-white shadow rounded p-6">
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
          Update Hotel
        </button>
      </form>
    </Admin>
  );
};

export default EditHotel;
