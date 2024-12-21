"use client";
import BookingEngine from "../../app/BookingEngine/page";

const Hero = () => {
  return (
    <div className="relative h-screen w-screen  ">
      <div className="relative h-full w-full bg-black">
        <div className="absolute bg-[url('/HeroImage.jpeg')] inset-0 bg-fixed bg-cover bg-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="absolute flex items-center justify-center bottom-12 lg:left-64 backdrop-blur-lg bg-black bg-opacity-50 border-[#c4a053] border-4 rounded-md z-10">
          <BookingEngine />
        </div>
      </div>
    </div>
  );
};

export default Hero;
