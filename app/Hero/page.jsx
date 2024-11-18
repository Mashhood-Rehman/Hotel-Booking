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
        {/* Background animation */}
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


        <div className="absolute top-1/2 right-4 lg:right-64 transform -translate-y-1/2 z-10">
          <BookingEngine />
        </div>
      </div>
    </div>
  );
};

export default Page;
