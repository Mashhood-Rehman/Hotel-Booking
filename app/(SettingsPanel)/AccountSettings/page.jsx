import SettingsLayout from "../../../components/SettingsLayout";

export default function AccountSettings() {
  return (
    <SettingsLayout>
      <h2 className="text-2xl font-semibold text-gray-800">Account Settings</h2>
      <form className="mt-6 space-y-4">
        {/* Your form inputs */}
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Update Account
        </button>
      </form>
    </SettingsLayout>
  );
}
