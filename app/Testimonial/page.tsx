"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      img: "https://readymadeui.com/team-2.webp",
      name: "John Doe",
      role: "Founder of Rubik",
      text: "The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.",
      stars: 3,
    },
    {
      img: "https://readymadeui.com/team-5.webp",
      name: "Mark Adair",
      role: "Founder of Alpha",
      text: "The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.",
      stars: 4,
    },
    {
      img: "https://readymadeui.com/team-4.webp",
      name: "Simon Konecki",
      role: "Founder of Labar",
      text: "The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.",
      stars: 5,
    },
    {
      img: "https://readymadeui.com/team-2.webp",
      name: "Jane Doe",
      role: "CEO of Acme",
      text: "Fantastic! I’ll definitely recommend this place to my friends. It exceeded all my expectations.",
      stars: 5,
    },
    {
      img: "https://readymadeui.com/team-5.webp",
      name: "Alice Smith",
      role: "Manager of Beta",
      text: "A delightful experience from start to finish. The service was efficient, and the food was mouthwatering.",
      stars: 4,
    },
    {
      img: "https://readymadeui.com/team-4.webp",
      name: "Michael Johnson",
      role: "CTO of Zeta",
      text: "Absolutely loved the atmosphere and service. The staff went above and beyond to ensure our satisfaction.",
      stars: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : testimonials.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < testimonials.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="px-6 py-12 bg-gradient-to-b from-black via-gray-900 to-black text-[#c4a053] font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold text-center lg:text-left">
            What Our Happy Clients Say
          </h2>
          <div className="flex space-x-4 mt-6 lg:mt-0">
            <button
              onClick={handlePrev}
              className="w-10 h-10 flex items-center justify-center bg-[#c4a053] rounded-full hover:bg-opacity-80 transition"
            >
              <Icon icon="mdi:chevron-left" className="text-black text-xl" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 flex items-center justify-center bg-[#c4a053] rounded-full hover:bg-opacity-80 transition"
            >
              <Icon icon="mdi:chevron-right" className="text-black text-xl" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`min-w-full p-8 transition-all ${
                  index === currentIndex ? "scale-105" : "opacity-60"
                }`}
              >
                <div className="relative bg-[#1f1f1f] border border-[#c4a053] rounded-3xl shadow-xl p-6">
                  <Image
                    src={testimonial.img}
                    alt={`${testimonial.name} avatar`}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full absolute -top-4 left-6 border-4 border-[#c4a053] object-cover"
                  />
                  <div className="mt-10 text-center">
                    <h4 className="text-lg font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-[#a39786]">{testimonial.role}</p>
                    <p className="mt-4 text-sm text-[#e0d7c1]">
                      {testimonial.text}
                    </p>
                    <div className="flex justify-center mt-4">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Icon
                          key={starIndex}
                          icon="mdi:star"
                          className={`text-xl ${
                            starIndex < testimonial.stars
                              ? "text-[#c4a053]"
                              : "text-gray-500"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
