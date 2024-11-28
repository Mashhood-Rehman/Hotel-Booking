"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const Submit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const SignInData = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (SignInData?.error) {
        console.log(SignInData.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log("Error during signing in:", error);
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign in
            </h2>
            <form onSubmit={Submit} className="mt-8 space-y-4">
              {/* Username Input */}
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    onChange={handleInputChange}
                    value={formData.email}
                    name="email"
                    type="email"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Your Email"
                  />
                  <Icon
                    icon="mdi:email-outline"
                    className="w-5 h-5 absolute right-4 bottom-4"
                    color="#bbb"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    onChange={handleInputChange}
                    value={formData.password}
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                  <Icon
                    icon={
                      isPasswordVisible
                        ? "mdi:eye-outline"
                        : "mdi:eye-off-outline"
                    }
                    className="w-5 h-5 absolute right-4 bottom-4 cursor-pointer"
                    color="#bbb"
                    onClick={togglePasswordVisibility}
                  />
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm">
                  <Link
                    href="/"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Sign-In Button */}
              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <span className="h-1   w-64 bg-gray-200"></span>
                <span className="text-black font-semibold">or</span>
                <span className="h-1 w-64 bg-gray-200"></span>
              </div>
              <div className=" flex items-center justify-center">
                <h2 className=" bg-black flex justify-center w-96 py-3 text-white rounded-lg">
                  Sign In with Google
                </h2>
              </div>

              {/* Register Link */}
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/SignUp"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
