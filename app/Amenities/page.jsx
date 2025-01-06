import Image from "next/image";
import React from "react";

const Page = () => {
  const amenities = [
    { name: "Pick Up & Drop", Imgsrc: "/pickup.webp", alt: "Pick-up & Drop" },
    { name: "Free-Wifi", Imgsrc: "/Wifi.webp", alt: "Free Wifi" },
    { name: "Pick Up & Drop", Imgsrc: "/pickup.webp", alt: "Pick-up & Drop" },
    { name: "Free-Wifi", Imgsrc: "/Wifi.webp", alt: "Free Wifi" },
    { name: "Pick Up & Drop", Imgsrc: "/pickup.webp", alt: "Pick-up & Drop" },
    { name: "Free-Wifi", Imgsrc: "/Wifi.webp", alt: "Free Wifi" },
  ];

  return (
    <div className="bg-black py-16 px-6 lg:px-24">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-[#c4a053] text-lg tracking-wider mb-2">
          Our Services
        </h1>
        <h2 className="text-white text-4xl font-bold mb-4">AMENITIES</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Explore the exclusive amenities we offer to make your stay
          unforgettable. From convenience to luxury, we’ve got you covered.
        </p>
      </div>

      {/* Amenities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
        {amenities.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-gray-800 hover:bg-[#c4a053] duration-300 ease-in-out p-6 rounded-lg shadow-md"
          >
            <Image
              src={item.Imgsrc}
              alt={item.alt}
              height={60}
              width={60}
              className="object-contain mb-4"
            />
            <p className="text-white font-semibold text-center">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
