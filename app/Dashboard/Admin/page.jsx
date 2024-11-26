// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Image from "next/image";

// const Page = () => {
//   const [data, setData] = useState({
//     name: "",
//     category: "",
//     city: "",
//     price: "",
//     link: "",
//     picture: "",
//   });
//   const changeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   };

//   const [image, setImage] = useState(false);
//   useEffect(() => {}, [data]);
//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const formdata = new FormData();
//     formdata.append("name", data.name);
//     formdata.append("city", data.city);
//     formdata.append("price", Number(data.price));
//     formdata.append("category", data.category);
//     formdata.append("link", data.link);
//     if (image) {
//       formdata.append("picture", image);
//     }

//     console.log("Submitting form data:", {
//       name: data.name,
//       price: data.price,
//       category: data.category,
//       link: data.link,
//       city: data.city,
//       image: image ? image.name : null, // Just for debugging
//     });

//     try {
//       const response = await axios.post(
//         `${import.meta.env.DATABASE_URL_POST}/`,
//         formdata
//       );
//       if (response.data.success) {
//         setData({
//           name: "",
//           category: "",
//           price: "",
//           city: "",
//           picture: "",
//           link: "",
//         });
//         setImage(null); // Reset image state
//       } else {
//         console.error("Error submitting data:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error during submission:", error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form onSubmit={onSubmit}>
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
//           <h2 className="text-2xl font-bold mb-6 text-center">
//             Add your Hotel/Appartment
//           </h2>
//           <div className="grid grid-cols-2 gap-6">
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="picture"
//               >
//                 <Image
//                   src={image ? URL.createObjectURL(image) : ""}
//                   className="h-24 w-24"
//                   alt="Uploaded"
//                   width={100}
//                   height={100}
//                 />
//               </label>
//               <input
//                 onChange={(e) => setImage(e.target.files[0])}
//                 type="file"
//                 id="name"
//                 name="name"
//                 className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="name"
//               >
//                 Name
//               </label>
//               <input
//                 type="text"
//                 onChange={changeHandler}
//                 value={data.name}
//                 id="name"
//                 name="name"
//                 className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//                 placeholder="Enter item name"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="category"
//               >
//                 Category
//               </label>
//               <select
//                 id="category"
//                 name="category"
//                 onChange={changeHandler}
//                 value={data.category}
//                 className=" appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//               >
//                 <option value="Appartment">Appartment</option>
//                 <option value="Hotel">Hotel</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="category"
//               >
//                 City
//               </label>
//               <select
//                 id="category"
//                 name="category"
//                 onChange={changeHandler}
//                 value={data.category}
//                 className=" appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//               >
//                 <option value="Lahore">Lahore</option>
//                 <option value="Islamabad">Islamabad</option>
//                 <option value="Karachi">Karachi</option>
//                 <option value="Faisalabad">Faisalabad</option>
//                 <option value="Multan">Multan</option>
//                 <option value="Peshawar">Peshawar</option>
//               </select>
//             </div>

//             <div className="mb-6">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="price"
//               >
//                 Price
//               </label>
//               <input
//                 type="number"
//                 id="price"
//                 name="price"
//                 onChange={changeHandler}
//                 value={data.price}
//                 className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//                 placeholder="Enter price"
//                 required
//               />
//             </div>

//             <div className="mb-6 col-span-2">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="description"
//               >
//                 Website Link
//               </label>
//               <input
//                 id="description"
//                 name="description"
//                 onChange={changeHandler}
//                 value={data.description}
//                 className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
//                 placeholder="Enter Appartment/Hotel Link"
//                 rows="4"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-between mt-6">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
//             >
//               Add Item
//             </button>
//             <button
//               type="button"
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
//             >
//               Back
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Page;

"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const Page = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    city: "",
    price: "",
    link: "",
    picture: "",
  });
  const [image, setImage] = useState(false);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("city", data.city);
    formdata.append("price", Number(data.price));
    formdata.append("category", data.category);
    formdata.append("link", data.link);
    if (picture) {
      formdata.append("image", picture);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL_POST}`,
        formdata
      );
      if (response.data.success) {
        setData({
          name: "",
          category: "",
          city: "",
          price: "",
          link: "",
          picture: "",
        });
        console.log("success", response.data);
        setImage(null);
      } else {
        console.error("Error submitting data:", response.data.message);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50">
      <form onSubmit={onSubmit} className="w-full max-w-3xl">
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
            Add Your Hotel/Appartment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <label htmlFor="picture" className="mb-4">
                <Image
                  src={image ? URL.createObjectURL(image) : "/placeholder.png"}
                  className="rounded-lg object-cover"
                  alt="Uploaded"
                  width={150}
                  height={150}
                />
              </label>
              <input
                type="file"
                id="picture"
                onChange={(e) => setImage(e.target.files[0])}
                className="file:py-2 file:px-4 file:border-0 file:rounded-full file:bg-blue-100 file:text-blue-700 file:font-medium hover:file:bg-blue-200"
                required
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={changeHandler}
                value={data.name}
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring focus:ring-blue-200 focus:outline-none"
                placeholder="Enter name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                onChange={changeHandler}
                value={data.category}
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring focus:ring-blue-200 focus:outline-none"
              >
                <option value="" disabled selected>
                  Select category
                </option>
                <option value="apartment">Apartment</option>
                <option value="hotel">Hotel</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-gray-700 font-medium mb-2"
              >
                City
              </label>
              <select
                id="city"
                name="city"
                onChange={changeHandler}
                value={data.city}
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring focus:ring-blue-200 focus:outline-none"
              >
                <option value="" disabled selected>
                  Select City
                </option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Karachi">Karachi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
                <option value="Peshawar">Peshawar</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                onChange={changeHandler}
                value={data.price}
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring focus:ring-blue-200 focus:outline-none"
                placeholder="Enter price"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="link"
                className="block text-gray-700 font-medium mb-2"
              >
                Website Link
              </label>
              <input
                type="url"
                id="link"
                name="link"
                onChange={changeHandler}
                value={data.link}
                className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:ring focus:ring-blue-200 focus:outline-none"
                placeholder="Enter website link"
                required
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg focus:outline-none"
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
