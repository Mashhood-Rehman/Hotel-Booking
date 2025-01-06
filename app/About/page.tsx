import Image from "next/image";

export default function AboutUs() {
  const ImageData = [
    { ImgSrc: "/about-01.jpg" },
    { ImgSrc: "/about-02.jpg" },
    { ImgSrc: "/about-03.jpg" },
    { ImgSrc: "/about-04.jpg" },
  ];

  return (
    <div className="p-6 md:p-12 bg-black">
      <div className="flex flex-col-reverse lg:flex-row lg:justify-evenly space-y-6 lg:space-y-0">
        <div className="grid grid-cols-2 gap-4">
          {ImageData.map((pic, index) => (
            <div key={index} className="flex">
              <Image
                height={176}
                width={176}
                src={pic.ImgSrc}
                className={`h-36 w-36 md:h-44 md:w-44 object-cover rounded-lg ${
                  index === 1 || index === 3 ? "mt-4 md:mt-6" : ""
                }`}
                alt={`image-${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Second Div */}
        <div className="flex flex-col space-y-6 text-white items-center lg:items-start">
          <h2
            style={{
              fontFamily: "Dancing Script, cursive",
              fontSize: "2rem",
              fontWeight: "700",
            }}
            className="text-2xl md:text-3xl font-semibold text-center text-[#c4a053] mb-4 md:mb-8"
          >
            <span> -</span>About Us<span> -</span>
          </h2>
          <h1 className="font-bold text-2xl md:text-3xl flex flex-wrap justify-center lg:justify-start items-center space-x-3">
            Welcome to
            <span className="mt-2 ml-2 animate-bounce">
              <Image src="/logo.jpeg" alt="Logo-image" height={80} width={80} />
            </span>
          </h1>
          <p className="w-full md:w-96 text-center lg:text-left">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda,
            accusamus.
          </p>
          <p className="w-full md:w-96 text-center lg:text-left">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga
            laudantium non nulla ab doloribus odio consequatur. Accusamus
            voluptates officiis corporis.
          </p>
          <div className="flex flex-col md:flex-row items-center md:space-x-3 space-y-3 md:space-y-0">
            {/* Third Div */}
            <div className="flex space-x-5 border-l-4 border-[#c4a053] p-2">
              <h1 className="text-[#c4a053] font-bold text-3xl md:text-4xl">
                10
              </h1>
              <div>
                <span className="text-gray-400">Years of</span>
                <h1 className="font-bold text-xl md:text-2xl">Experience</h1>
              </div>
            </div>
            {/* Fourth Div */}
            <div className="flex space-x-5 border-l-4 border-[#c4a053] p-2">
              <h1 className="text-[#c4a053] font-bold text-3xl md:text-4xl">
                15
              </h1>
              <div>
                <span className="text-gray-400">Popular</span>
                <h1 className="font-bold text-xl md:text-2xl">
                  Hotels | Apartments
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
