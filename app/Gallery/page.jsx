"use client";
import React, { useState } from "react";
import Image from "next/image";
import ImageModal from "../ImageModal/page";
import { GalleryPage } from "../Helpers/Data";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setIsModalOpen(true);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <main className="bg-black p-2">
        <div className="grid place-items-center text-white text-5xl pt-10">
          <h1>Gallery</h1>
        </div>

        <section className="relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {GalleryPage.map((card, index) => (
              <div
                key={index}
                className="bg-white relative group transform-gpu transition-transform duration-500 shadow-lg hover:border-[#c4a053] ease-in-out border w-full max-w-sm rounded-xl font-[sans-serif] overflow-hidden mx-auto"
              >
                <div className="relative" onClick={() => openModal(index)}>
                  <Image
                    height={288}
                    width={383}
                    src={card.Imgsrc}
                    alt={card.alt}
                    priority
                    className="h-32 w-64 sm:h-auto sm:w-full transition-transform duration-500 ease-in-out transform group-hover:scale-110 object-center rounded-t-lg cursor-pointer"
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-t-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialIndex={currentIndex}
      />
    </div>
  );
};

export default Page;
