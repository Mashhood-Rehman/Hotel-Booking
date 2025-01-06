"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!token) {
      setMessage("Token is missing or invalid.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/ResetPassword", {
        token,
        newPassword,
      });

      setMessage(res.data.message || "Error");
      router.push("/SignIn");
    } catch (error) {
      setMessage("Something went wrong!");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto h-96 py-80 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Reset Password
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-red-600">{message}</p>
      )}
    </div>
  );
};

export default ResetPasswordForm;
