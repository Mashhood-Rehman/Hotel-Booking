import Image from "next/image";
import React from "react";

const page = () => {
  const Images = [
    { Imgsrc: "/SPA.jpeg", service: "Relax", alt: "SPA-Image" },
    { Imgsrc: "/Dine.jpeg", service: "Dine", alt: "Dining-Image" },
    { Imgsrc: "/Stay.jpeg", service: "Stay", alt: "Stay-Image" },
    { Imgsrc: "/Wedding.jpeg", service: "Wedding", alt: "Wedding" },
  ];
  return (
    <div className="bg-black">
      <div className="flex flex-col space-y-4 p-6 md:p-16 items-center justify-center">
        <h1 className="text-[#c4a053] text-lg md:text-xl">Comfort and Relax</h1>
        <h1 className="text-white text-3xl md:text-5xl font-thin text-center">
          What We Offer
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 items-center justify-center">
        {Images.map((pic, index) => (
          <div key={index} className="relative cursor-pointer group">
            <Image
              className="rounded-lg h-auto w-full"
              src={pic.Imgsrc}
              alt={pic.alt}
              height={200}
              width={200}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg md:text-xl font-semibold">
                {pic.service}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
