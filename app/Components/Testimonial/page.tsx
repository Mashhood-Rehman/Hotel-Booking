"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Accordion } from "../ui/accordion";
import { AccordionDemo } from "../Accordion/page";

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

  // Move to the previous testimonial
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : testimonials.length - 3
    );
  };

  // Move to the next testimonial
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < testimonials.length - 3 ? prevIndex + 1 : 0
    );
  };

  return (
    <>
      <div className="pl-10 font-[sans-serif] mt-4 mb-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 max-lg:max-w-2xl">
            <div className="col-span-2">
              <h2 className="text-gray-800 text-3xl font-extrabold">
                What our happy client say
              </h2>
            </div>

            <div className="flex space-x-4 items-end justify-end">
              {/* Previous Button */}
              <div
                className="bg-gray-200 w-10 h-10 grid items-center justify-center rounded-full rotate-90 shrink-0 cursor-pointer"
                onClick={handlePrev}
              >
                <Icon
                  icon="mdi:chevron-down"
                  className="text-gray-800 text-lg"
                />
              </div>
              {/* Next Button */}
              <div
                className="bg-blue-600 w-10 h-10 grid items-center justify-center rounded-full -rotate-90 shrink-0 cursor-pointer"
                onClick={handleNext}
              >
                <Icon icon="mdi:chevron-down" className="text-white text-lg" />
              </div>
            </div>
          </div>

          <div className="overflow-hidden  mt-16">
            <div
              className="flex space-x-10 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (360 + 24)}px)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="max-w-sm h-auto py-5 pl-14 pr-4 bg-white border-2 rounded-3xl relative flex-shrink-0"
                >
                  <Image
                    src={testimonial.img}
                    alt={`${testimonial.name} avatar`}
                    width={100}
                    height={100}
                    className="w-20 h-20 rounded-full absolute -left-10 top-0 bottom-0 my-auto border-2 border-gray-300"
                  />

                  <div>
                    <h4 className="text-gray-800 text-base font-bold">
                      {testimonial.name}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {testimonial.text}
                    </p>
                  </div>

                  {/* Star Ratings */}
                  <div className="flex space-x-1 mt-4">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Icon
                        key={starIndex}
                        icon="mdi:star"
                        className={`w-4 h-4 ${
                          starIndex < testimonial.stars
                            ? "text-blue-600"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-4 p-0">
        <AccordionDemo />
      </div>
    </>
  );
};

export default Testimonials;