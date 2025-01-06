"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const Page = () => {
  const [data, setData] = useState({
    name: "",
    city: "",
    link: "",
    type: "apartment",
  });
  const [image, setImage] = useState(null);
  const [submitData, setSubmitData] = useState(false);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitData(true);
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
        "http://localhost:3000/api/route",
        formdata
      );
      if (response.data) {
        setData({
          name: "",
          city: "",
          link: "",
          type: "apartment",
        });
        setImage(null);
      } else {
        console.error("Error submitting data:", response.data.message);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setSubmitData(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Add Apartment</h1>
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Add New Item</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="picture"
              >
                {image ? (
                  <Image
                    src={URL.createObjectURL(image)}
                    className="h-24 w-24"
                    alt="Uploaded"
                    width={50}
                    height={50}
                  />
                ) : (
                  <span>No Image Uploaded</span>
                )}
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
                className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              >
                <option value="apartment">apartment</option>
              </select>
            </div>

            <div className="mb-6 col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                onChange={changeHandler}
                value={data.city}
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Enter item city"
              />
            </div>

            <div className="mb-6 col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="link"
              >
                Link
              </label>
              <input
                id="link"
                name="link"
                onChange={changeHandler}
                value={data.link}
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Enter item link"
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
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
