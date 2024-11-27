import AdminLayout from "../../Components/AdminLayout";

const Page = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Welcome to the Admin Panel</h1>
      <p className="text-gray-600">Manage hotels, apartments, and more.</p>
    </AdminLayout>
  );
};

export default Page;
