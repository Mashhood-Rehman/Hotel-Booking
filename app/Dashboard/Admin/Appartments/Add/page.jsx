"use client";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import axios from "axios";
import Image from "next/image";

const Page = () => {
  const [data, setData] = useState({
    name: "",
    city: "",
    link: "",
    type: "apartment",
    picture: "",
  });
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const [image, setImage] = useState(false);
  useEffect(() => {}, [data]);
  const onSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("city", data.city);
    formdata.append("link", data.link);
    formdata.append("type", data.type);
    if (image) {
      formdata.append("picture", image);
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/route`,
        formdata
      );
      if (response.data) {
        setData({
          name: "",
          city: "",
          link: "",
          type: "",
        });
        setImage(null); // Reset image state
      } else {
        console.error("Error submitting data:", response.data.message);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Add Appartment</h1>
      <form onSubmit={onSubmit}>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Add New Item</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="picture"
              >
                <Image
                  src={image ? URL.createObjectURL(image) : ""}
                  className="h-24 w-24"
                  alt="Uploaded"
                  width={50}
                  height={50}
                />
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="picture"
                name="picture"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                onChange={changeHandler}
                value={data.name}
                id="name"
                name="name"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Enter item name"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                onChange={changeHandler}
                value={data.type}
                className=" appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              >
                <option value="apartment">apartment</option>
              </select>
            </div>

            <div className="mb-6 col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                city
              </label>
              <input
                id="city"
                name="city"
                onChange={changeHandler}
                value={data.city}
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Enter item description"
                rows="4"
              />
            </div>
            <div className="mb-6 col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                link
              </label>
              <input
                id="link"
                name="link"
                onChange={changeHandler}
                value={data.link}
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Enter item description"
                rows="4"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Add Item
            </button>
            <button
              type="button"
              onClick={() => navigate("/items")}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default Page;
