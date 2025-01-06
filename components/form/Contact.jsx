"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
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
    <div className="font-[sans-serif]  mx-auto p-8 bg-black rounded-xl shadow-2xl">
      <motion.div
        className="bg-black text-[#c4a053] shadow-xl rounded-lg p-32 transform transition-all hover:scale-105"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl text-[#c4a053] font-extrabold text-center mb-8">
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
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full bg-[#2a2a2a] rounded-lg py-4 px-6 text-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c4a053] focus:ring-offset-2 shadow-sm transition-all"
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-[#2a2a2a] rounded-lg py-4 px-6 text-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c4a053] focus:ring-offset-2 shadow-sm transition-all"
          />
          <motion.input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full bg-[#2a2a2a] rounded-lg py-4 px-6 text-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c4a053] focus:ring-offset-2 shadow-sm transition-all"
          />
          <motion.textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full bg-[#2a2a2a] rounded-lg px-6 py-4 text-lg text-white focus:outline-none focus:ring-2 focus:ring-[#c4a053] focus:ring-offset-2 shadow-sm transition-all"
          ></motion.textarea>

          <motion.button
            type="submit"
            className="w-full text-black bg-[#c4a053] hover:bg-[#d4a54f] rounded-lg text-lg py-3 mt-6 flex items-center justify-center transition-all transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            disabled={isSubmitting}
          >
            <Icon icon="mdi:send" className="mr-3" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>

          {statusMessage && (
            <p
              className={`mt-4 text-sm font-medium text-center ${
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

export default Contact;
