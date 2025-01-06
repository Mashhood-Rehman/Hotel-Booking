import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 px-10 font-sans tracking-wide text-[#c4a053]">
      <div className="lg:max-w-[50%] mx-auto text-center">
        <h3 className="text-3xl font-bold text-[#c4a053]">Newsletter</h3>
        <p className="text-sm mt-6 text-gray-400">
          Subscribe to our newsletter and stay up to date with the latest news,
          updates, and exclusive offers. Get valuable insights. Join our
          community today!
        </p>

        <div className="bg-[#2a2a2a] flex px-2 py-1.5 rounded-full text-left mt-10">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full outline-none bg-transparent text-sm pl-4 text-white"
          />
          <button
            type="button"
            className="bg-[#c4a053] hover:bg-[#a38440] text-black text-sm rounded-full px-5 py-2.5 ml-4 transition-all"
          >
            Submit
          </button>
        </div>
      </div>

      <hr className="border-gray-700 my-12" />

      <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-bold mb-6 text-[#c4a053]">About Us</h4>
          <p className="text-gray-400 mb-2 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            gravida, mi eu pulvinar cursus, sem elit interdum mauris.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-[#c4a053]">Services</h4>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c4a053] text-[15px]"
              >
                Hotel Booking
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c4a053] text-[15px]"
              >
                Appartment Booking
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c4a053] text-[15px]"
              >
                Hotel Renting
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c4a053] text-[15px]"
              >
                Appartment Renting
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-[#c4a053]">Resources</h4>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c4a053] text-[15px]"
              >
                Webinars
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c4a053] text-[15px]"
              >
                Ebooks
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c4a053] text-[15px]"
              >
                Templates
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c4a053] text-[15px]"
              >
                Tutorials
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-[#c4a053]">More Info</h4>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c4a053] text-[15px]"
              >
                Our Story
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c4a053] text-[15px]"
              >
                Mission and Values
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c4a053] text-[15px]"
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-[#c4a053] text-[15px]"
              >
                Testimonials
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
