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
      email: z.string().min(1, "Email is required").email("Invalid email"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  const [data, setData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      FormSchema.parse(data);
      setErrors({});

      const response = await axios.post("/api/user", data);
      if (response.data) {
        localStorage.setItem("email", data.email);
        router.push("/VerifyOtp");
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
