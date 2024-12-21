import Image from "next/image";
import React from "react";

const page = () => {
  const amenities = [
    { name: "Pick Up & Drop", Imgsrc: "/pickup.webp", alt: "Pic" },
    { name: "Free-Wifi", Imgsrc: "/Wifi.webp", alt: "Wifi" },
    { name: "Pick Up & Drop", Imgsrc: "/pickup.webp", alt: "Pic" },
    { name: "Free-Wifi", Imgsrc: "/Wifi.webp", alt: "Wifi" },
    { name: "Pick Up & Drop", Imgsrc: "/pickup.webp", alt: "Pic" },
    { name: "Free-Wifi", Imgsrc: "/Wifi.webp", alt: "Wifi" },
  ];

  return (
    <div className="bg-black p-24 ">
      {/* first div */}
      <div className=" flex items-center justify-between">
        <div className="flex  items-center justify-evenly mb-8">
          <div className="space-y-4">
            <h1 className="text-[#c4a053] text-lg tracking-wider">
              Our Services
            </h1>
            <h1 className="text-white text-4xl">AMENITIES</h1>
            <p className="w-96 text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus nulla error fugiat unde illo placeat?
            </p>
          </div>
        </div>

        {/* second div */}
        <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-1 lg:grid-rows-2  space-x-2 space-y-2">
          {amenities.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-4 bg-gray-700 hover:bg-[#c4a053] duration-300 ease-in-out p-6 rounded-md w-40   h-40"
              >
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src={item.Imgsrc}
                    alt={item.alt}
                    height={50}
                    width={50}
                    className="object-contain"
                  />
                </div>
                <p className="text-white text-center">{item.name}</p>
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default page;
