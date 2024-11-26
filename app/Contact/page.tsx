// "use client";

// import Image from "next/image";
// import React, { useState } from "react";

// const InquiryForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     website: "",
//     company: "",
//     subject: "",
//     message: "",
//     agree: false,
//   });

//   // Handle input changes
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Submit handler (to be replaced with actual logic)
//   const handleSubmit = () => {
//     console.log("Form Submitted", formData);
//   };

//   return (
//     <div className="font-[sans-serif]">
//       <div className="bg-gradient-to-r from-blue-700 to-blue-300 w-full h-60">
//         <Image
//           src="https://readymadeui.com/cardImg.webp"
//           alt="Banner"
//           className="w-full h-full object-cover"
//           width={1000}
//           height={400}
//         />
//       </div>

//       <div className="-mt-28 mb-6 px-4">
//         <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
//           <h2 className="text-xl text-gray-800 font-bold">
//             Product or Service Inquiry
//           </h2>

//           <form
//             className="mt-8 grid sm:grid-cols-2 gap-6"
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleSubmit();
//             }}
//           >
// <div>
//   <label
//     htmlFor="name"
//     className="text-gray-800 text-sm block mb-2"
//   >
//     Your Name
//   </label>
//   <input
//     type="text"
//     id="name"
//     name="name"
//     placeholder="Enter Name"
//     value={formData.name}
//     onChange={handleInputChange}
//     className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
//   />
// </div>

// <div>
//   <label
//     htmlFor="email"
//     className="text-gray-800 text-sm block mb-2"
//   >
//     Your Email
//   </label>
//   <input
//     type="email"
//     id="email"
//     name="email"
//     placeholder="Email"
//     value={formData.email}
//     onChange={handleInputChange}
//     className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
//   />
// </div>

// <div>
//   <label
//     htmlFor="phone"
//     className="text-gray-800 text-sm block mb-2"
//   >
//     Your Number
//   </label>
//   <input
//     type="text"
//     id="phone"
//     name="phone"
//     placeholder="Phone No."
//     value={formData.phone}
//     onChange={handleInputChange}
//     className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
//   />
// </div>

// <div>
//   <label
//     htmlFor="website"
//     className="text-gray-800 text-sm block mb-2"
//   >
//     Website
//   </label>
//   <input
//     type="text"
//     id="website"
//     name="website"
//     placeholder="Website"
//     value={formData.website}
//     onChange={handleInputChange}
//     className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
//   />
// </div>

// <div>
//   <label
//     htmlFor="company"
//     className="text-gray-800 text-sm block mb-2"
//   >
//     Company
//   </label>
//   <input
//     type="text"
//     id="company"
//     name="company"
//     placeholder="Company"
//     value={formData.company}
//     onChange={handleInputChange}
//     className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
//   />
// </div>

// <div>
//   <label
//     htmlFor="subject"
//     className="text-gray-800 text-sm block mb-2"
//   >
//     Subject
//   </label>
//   <input
//     type="text"
//     id="subject"
//     name="subject"
//     placeholder="Subject"
//     value={formData.subject}
//     onChange={handleInputChange}
//     className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
//   />
// </div>

// <div className="col-span-full">
//   <label
//     htmlFor="message"
//     className="text-gray-800 text-sm block mb-2"
//   >
//     Message
//   </label>
//   <textarea
//     id="message"
//     name="message"
//     rows={6}
//     placeholder="Message"
//     value={formData.message}
//     onChange={handleInputChange}
//     className="w-full rounded-md px-4 border border-gray-300 text-sm pt-3 outline-[#007bff]"
//   ></textarea>
// </div>

// <div className="flex items-center col-span-full">
//   <input
//     id="agree"
//     name="agree"
//     type="checkbox"
//     checked={formData.agree}
//     onChange={handleInputChange}
//     className="w-4 h-4 mr-3 shrink-0"
//   />
//   <label htmlFor="agree" className="text-sm text-gray-500">
//     I agree to the{" "}
//     {/* <a href="javascript:void(0);" className="underline">
//       Terms and Conditions
//     </a>{" "}
//     and{" "}
//     <a href="javascript:void(0);" className="underline">
//       Privacy Policy
//     </a> */}
//   </label>
// </div>

//             <button
//               type="submit"
//               className="text-white w-max bg-[#007bff] hover:bg-blue-600 tracking-wide rounded-md text-sm px-6 py-3 mt-4"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16px"
//                 height="16px"
//                 fill="#fff"
//                 className="mr-2 inline"
//                 viewBox="0 0 548.244 548.244"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
//                   clipRule="evenodd"
//                   data-original="#000000"
//                 />
//               </svg>
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InquiryForm;

"use client";

import Image from "next/image";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const InquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    company: "",
    subject: "",
    message: "",
    agree: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    if (!formData.agree) {
      setIsSubmitting(false);
      setStatusMessage("Please agree to the Terms and Conditions.");
      return;
    }

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      console.log("Success:", result.text);
      setStatusMessage("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        website: "",
        company: "",
        subject: "",
        message: "",
        agree: false,
      });
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Failed to send the message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="bg-gradient-to-r from-blue-700 to-blue-300 w-full h-60">
        <Image
          src="https://readymadeui.com/cardImg.webp"
          alt="Banner"
          className="w-full h-full object-cover"
          width={1000}
          height={400}
        />
      </div>

      <div className="-mt-28 mb-6 px-4">
        <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
          <h2 className="text-xl text-gray-800 font-bold">
            Product or Service Inquiry
          </h2>

          <form
            className="mt-8 grid sm:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="text-gray-800 text-sm block mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-gray-800 text-sm block mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="text-gray-800 text-sm block mb-2"
              >
                Your Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone No."
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="text-gray-800 text-sm block mb-2"
              >
                Website
              </label>
              <input
                type="text"
                id="website"
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="text-gray-800 text-sm block mb-2"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="text-gray-800 text-sm block mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
              />
            </div>

            <div className="col-span-full">
              <label
                htmlFor="message"
                className="text-gray-800 text-sm block mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full rounded-md px-4 border border-gray-300 text-sm pt-3 outline-[#007bff]"
              ></textarea>
            </div>

            <div className="flex items-center col-span-full">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                checked={formData.agree}
                onChange={handleInputChange}
                className="w-4 h-4 mr-3 shrink-0"
              />
              <label htmlFor="agree" className="text-sm text-gray-500">
                I agree to the Terms & Conditions...
                {/* <a href="javascript:void(0);" className="underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="javascript:void(0);" className="underline">
                  Privacy Policy
                </a> */}
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`text-white w-max ${
                isSubmitting ? "bg-gray-400" : "bg-[#007bff] hover:bg-blue-600"
              } tracking-wide rounded-md text-sm px-6 py-3 mt-4`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
          {statusMessage && (
            <p className="mt-4 text-sm text-center text-blue-600">
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;
