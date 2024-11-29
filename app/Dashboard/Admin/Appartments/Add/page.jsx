// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import AdminLayout from "@/components/AdminLayout";

// const Page = () => {
//   const [name, setName] = useState("");
//   const router = useRouter();

//   const addAppartment = (e) => {
//     e.preventDefault();
//     // Placeholder for POST request
//     fetch("/api/appartments", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name }),
//     }).then(() => router.push("/admin/appartments"));
//   };

//   return (
//     <AdminLayout>
//       <h1 className="text-2xl font-bold mb-6">Add Appartment</h1>
//       <form onSubmit={addAppartment} className="bg-white shadow rounded p-6">
//         <div className="mb-4">
//           <label className="block text-gray-700">Appartment Name</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           type="submit"
//         >
//           Add Appartment
//         </button>
//       </form>
//     </AdminLayout>
//   );
// };

// export default Page;

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import axios from "axios";

const Page = () => {
  const [formData, setFormData] = useState({
    picture: null,
    name: "",
    city: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  const addAppartment = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("picture", formData.picture);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("city", formData.city);

      await axios.post("/api/route?type=apartment", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/admin/appartments");
    } catch (err) {
      console.error("Error adding appartment:", err);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Add Appartment</h1>
      <form onSubmit={addAppartment} className="bg-white shadow rounded p-6">
        {/* Picture Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Appartment Picture</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={handleFileChange}
          />
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Appartment Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter appartment name"
          />
        </div>

        {/* City Field */}
        <div className="mb-4">
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            name="city"
            className="w-full p-2 border rounded"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
          />
        </div>

        {/* Submit Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add Appartment
        </button>
      </form>
    </AdminLayout>
  );
};

export default Page;
