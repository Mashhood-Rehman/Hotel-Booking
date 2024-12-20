import axios from "axios";
import AdminLayout from "../../../../components/AdminLayout";
import Image from "next/image";

const fetchUsers = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/adminSearch?type=hotel"
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Failed to load users", hotel: [] };
  }
};
const Page = async () => {
  const { hotel = [], error = null } = await fetchUsers();
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
      {error && <p className="text-red-500">{error}</p>}
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
          {Array.isArray(hotel) &&
            hotel.map((hotel) => (
              <tr key={hotel.id} className="border-b">
                <td className="p-4">
                  <Image
                    src={hotel.picture}
                    width={100}
                    height={100}
                    alt="hotels pictures"
                    className="rounded-md h-24 w-auto"
                  />
                </td>
                <td className="p-4">{hotel.name}</td>
                <td className="p-4">{hotel.city}</td>
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
