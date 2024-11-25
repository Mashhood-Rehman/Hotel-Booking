"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BookingEngine from "../BookingEngine/page";

const Page = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["/HeroPic.jpg", "/HeroPic2.jpg", "/HeroPic3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="-mt-36">
      <div className="relative h-screen bg-black">
        <motion.div
          key={currentImage}
          className="absolute inset-0 bg-center bg-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
          style={{
            backgroundImage: `url(${images[currentImage]})`,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </motion.div>

        <div className="absolute flex items-center justify-center  -bottom-12 lg:left-32  backdrop-blur-lg bg-black bg-opacity-50 border-blue-600 border-4 rounded-md  z-10">
          <BookingEngine />
        </div>
      </div>
    </div>
  );
};

export default Page;
