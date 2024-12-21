import axios from "axios";
import AdminLayout from "../../../components/AdminLayout";

const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/user");
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Failed to load users", users: [] };
  }
};

const Page = async () => {
  const { users = [], error = null } = await fetchUsers();

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
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
              <td colSpan="3" className="p-4 text-center">
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
