"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setStatusMessage("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Failed to send the message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-[sans-serif] max-w-6xl max-lg:max-w-3xl mx-auto p-4">
      <motion.div
        className="bg-blue-800 text-black shadow-xl rounded-lg p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl text-white font-extrabold text-center mb-12">
          Contact Us
        </h2>

        <motion.form
          className="space-y-6"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full bg-gray-100 rounded py-3 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-gray-100 rounded py-3 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <motion.input
            type="tel"
            name="phone"
            placeholder="Phone No."
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full bg-gray-100 rounded py-3 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <motion.textarea
            name="message"
            placeholder="Message"
            rows="6"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full bg-gray-100 rounded px-6 text-sm pt-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></motion.textarea>
          <motion.button
            type="submit"
            className="text-black bg-blue-600 hover:bg-blue-700 rounded text-sm px-6 py-3 mt-6 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            disabled={isSubmitting}
          >
            <Icon icon="mdi:send" className="mr-2" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>
          {statusMessage && (
            <p
              className={`mt-4 text-sm ${
                statusMessage.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </motion.form>
      </motion.div>
    </div>
  );
};

export default InquiryForm;
