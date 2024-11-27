import AdminLayout from "../../Components/AdminLayout";

const Page = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Welcome to the Admin Panel</h1>
      <p className="text-gray-600">Manage hotels, apartments, and more.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5">
        {/* Add Hotel Card */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300">
          <div className="bg-[#2563eb] p-6">
            <h2 className="text-2xl font-semibold text-white">Add Hotel</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              Effortlessly manage and grow your business by adding new hotels to
              our platform. Provide comprehensive details like name, location,
              amenities, room types, and pricing to attract potential customers.
            </p>
            <ul className="text-gray-600 list-disc pl-5 mb-6 space-y-2">
              <li>Add hotel details like name, address, and description</li>
              <li>Upload images to showcase the property</li>
              <li>Manage amenities and room availability</li>
              <li>Set pricing and seasonal offers</li>
            </ul>
          </div>
        </div>

        {/* Add Apartment Card */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300">
          <div className="bg-[#2563eb] p-6">
            <h2 className="text-2xl font-semibold text-white">Add Apartment</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              Expand your property portfolio by listing apartments on our
              platform. Share vital details such as location, apartment size,
              features, and pricing to connect with tenants quickly and
              effectively.
            </p>
            <ul className="text-gray-600 list-disc pl-5 mb-6 space-y-2">
              <li>
                Enter apartment-specific details like floor plan, size, and
                features
              </li>
              <li>Upload high-quality photos for better visibility</li>
              <li>Highlight nearby attractions and services</li>
              <li>Manage rental options and availability</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;
