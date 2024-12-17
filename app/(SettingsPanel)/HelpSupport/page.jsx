// pages/settings/help-support.js
import SettingsLayout from "../../../components/SettingsLayout";
export default function HelpSupport() {
  return (
    <SettingsLayout>
      <h2 className="text-2xl font-semibold text-gray-800">Help & Support</h2>
      <section className="mt-6">
        <h3 className="text-xl font-medium text-gray-700">
          Frequently Asked Questions
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>How can I book a hotel?</li>
          <li>How do I reset my password?</li>
          <li>What payment methods are supported?</li>
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="text-xl font-medium text-gray-700">Contact Support</h3>
        <p className="text-gray-600">
          If you can't find an answer, please reach out to our support team.
        </p>
        <form className="mt-4">
          <textarea
            placeholder="Describe your issue..."
            rows="4"
            className="w-full border border-gray-300 p-3 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
          >
            Submit Ticket
          </button>
        </form>
      </section>
    </SettingsLayout>
  );
}
