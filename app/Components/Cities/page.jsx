"use client";
import React, { useState, useEffect } from "react";
import { RoomCards } from "../../Helpers/Data";
import Image from "next/image";

const Page = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const handleNext = () => {
    if (currentIndex < RoomCards.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <main className="mt-36">
        <div className="flex flex-col items-center justify-center space-y-5 text-lg lg:text-3xl">
          <h1>Cities</h1>
          <span className="text-sm lg:text-xl">
            Select the city and get the hotels
          </span>
        </div>

        <section className="relative">
          <div className="flex items-center justify-center mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-full"
            >
              <Image
                src="/handler.png"
                alt="left-arrow"
                height={45}
                width={45}
                className={`h-auto w-full ${
                  currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                } scale-x-[-1]`}
              />
            </button>

            <div className="grid gap-4 overflow-hidden w-full max-w-5xl grid-cols-3 sm:grid-cols-1 md:grid-cols-3">
              {RoomCards.slice(currentIndex, currentIndex + visibleCards).map(
                (card, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center mt-4"
                  >
                    <div
                      className={`relative ${
                        index === 1 ? "w-48 h-64" : "w-64 h-48"
                      }`}
                    >
                      <Image
                        src={card.Imgsrc}
                        alt={card.name}
                        fill
                        className={`object-cover ${
                          index === 1
                            ? "rounded-full aspect-[1/2]"
                            : "rounded-[50%] aspect-[3/2]"
                        }`}
                        quality={100}
                      />
                    </div>

                    {/* Card Content Section */}
                    <div className="p-4 text-center">
                      <h3 className="text-xl font-bold">{card.name}</h3>
                      <p className="mt-3 text-xs text-gray-700 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentIndex >= RoomCards.length - visibleCards}
              className="p-2 rounded-full"
            >
              <Image
                src="/handler.png"
                alt="right-arrow"
                height={45}
                width={45}
                className={`h-auto w-full ${
                  currentIndex === RoomCards.length - visibleCards
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
