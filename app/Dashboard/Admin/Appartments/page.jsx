import AdminLayout from "../../../../components/AdminLayout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const fetchUsers = async () => {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/adminSearch?type=apartment"
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Failed to load users", appartments: [] };
  }
};

const Page = async () => {
  const { appartments = [], error = null } = await fetchUsers();

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
          {appartments?.map((appartments) => (
            <tr key={appartments.id} className="border-b">
              {/* <td className="p-4">{appartments.id}</td> */}
              <td className="p-4">
                <Image
                  src={appartments.picture}
                  width={100}
                  height={100}
                  alt="appartments pictures"
                  className="rounded-md h-24 w-auto"
                />
              </td>
              <td className="p-4">{appartments.name}</td>
              <td className="p-4">{appartments.city}</td>
              <td className="p-4">
                <Link
                  href={`/admin/hotels/edit?id=${appartments.id}`}
                  className="text-blue-500 mr-4"
                >
                  Edit
                </Link>
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
