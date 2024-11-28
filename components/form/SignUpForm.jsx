"use client";

import { Icon } from "@iconify/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export default function SignUpForm() {
  const router = useRouter();

  const FormSchema = z
    .object({
      name: z.string().min(3, "Name must be at least three characters long"),
      email: z.string().min(1, "Email is required").email("Invalid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(1, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      FormSchema.parse(data);
      setErrors({});

      const response = await axios.post("/api/user", data);
      if (response.data) {
        console.log("good ho gaya");
        router.push("/SignIn");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(validationErrors);
      } else {
        console.log("Error occurred", error);
      }
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign Up
            </h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  User name
                </label>
                <div className="relative flex flex-col items-center">
                  <input
                    id="name"
                    value={data.name}
                    onChange={changeHandler}
                    name="name"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter user name"
                  />
                  <Icon
                    icon="mdi:account-circle"
                    className="w-5 h-5 absolute right-4 bottom-4"
                    color="#bbb"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <div className="relative flex flex-col items-center">
                  <input
                    id="email"
                    value={data.email}
                    onChange={changeHandler}
                    name="email"
                    type="email"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter email"
                  />
                  <Icon
                    icon="mdi:email-outline"
                    className="w-5 h-5 absolute right-4 bottom-4"
                    color="#bbb"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex flex-col items-center">
                  <input
                    id="password"
                    value={data.password}
                    onChange={changeHandler}
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
                  {errors.password && (
                    <p className="text-red-500 text-xs">{errors.password}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Confirm Password
                </label>
                <div className="relative flex flex-col items-center">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={changeHandler}
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Re-enter password"
                  />
                  <Icon
                    icon={
                      isConfirmPasswordVisible
                        ? "mdi:eye-outline"
                        : "mdi:eye-off-outline"
                    }
                    className="w-5 h-5 absolute right-4 bottom-4 cursor-pointer"
                    color="#bbb"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign Up
                </button>
              </div>

              <p className="text-gray-800 text-sm !mt-8 text-center">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/SignIn")}
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Sign In here
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
