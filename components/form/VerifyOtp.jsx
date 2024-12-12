"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function VerifyOtp() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    password: "",
    email: localStorage.getItem("email"),
    otp: "",
  });
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!data.email || !data.name || !data.password) {
      setError("Email not found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/verifyOtp",
        data
      );
      if (response.data) {
        setIsVerified(true);
        router.push("/SignIn");
      }
    } catch (error) {
      console.log(`Error verifying OTP: ${error.response?.data?.message}`);
      setError(`${error.response?.data?.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Verify OTP
            </h2>
            <form onSubmit={handleOtpSubmit} className="mt-8 space-y-4">
              <input
                name="name"
                type="text"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg border border-gray-300"
                required
              />

              <input
                name="password"
                type="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg border border-gray-300"
                required
              />

              <input
                name="otp"
                type="text"
                value={data.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg border border-gray-300"
                required
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {isVerified && (
                <p className="text-green-500 text-sm mt-2">OTP Verified!</p>
              )}
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
