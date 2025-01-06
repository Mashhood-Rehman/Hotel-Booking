"use client";
import BookingEngine from "../../app/BookingEngine/page";

const Hero = () => {
  return (
    <div className="relative h-screen w-screen  ">
      <div className="relative h-full w-full bg-black">
        <div className="absolute bg-[url('/HeroImage.jpeg')] inset-0 bg-fixed bg-cover bg-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div>
          <h1 className=" text-[#c4a053] text-lg  absolute top-[40%] lg:left-[46%] left-[40%]">
            Rixos Luxury Hotel
          </h1>
          <span className=" text-white lg:text-7xl text-3xl  font-thin absolute top-[50%] lg:left-[36%] left-[30%]">
            Rooms <span className="text-[#c4a053]">&</span> Suites
          </span>
        </div>

        <div className="absolute flex items-center justify-center bottom-2  lg:left-64 left-32 backdrop-blur-lg bg-black bg-opacity-50 border-[#c4a053] border-4 rounded-md z-10">
          <BookingEngine />
        </div>
      </div>
    </div>
  );
};

export default Hero;
