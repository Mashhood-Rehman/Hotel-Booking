"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

type ResultItem = {
  name: string;
  price: number | string;
  city: string;
  picture: string;
  link: string;
};

function Results() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const type = searchParams.get("type");

  const [results, setResults] = useState<ResultItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/search?city=${city}&type=${type}`
        );
        setResults(response.data);
        setError(null); // Clear any previous error
      } catch (error) {
        setError("Failed to fetch results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (city && type) fetchData();
  }, [city, type]);

  return (
    <div className="min-h-screen  text-gray-200 py-8 px-4">
      <h1 className="text-4xl text-blue-400 font-bold text-center mb-8">
        Results for
        <span className=" ml-2">{type}s in </span>
        <span className="">{city}</span>
      </h1>
      {error && (
        <p className="text-red-500 text-center text-lg mb-4">{error}</p>
      )}
      {loading ? (
        <p className="text-center text-gray-400 text-xl">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={item.picture}
                    alt={`Image of ${item.name}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-white">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-300 mb-2">
                    <span className="font-medium">City:</span> {item.city}
                  </p>

                  <Link href={item.link} target="_blank">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center text-lg col-span-full">
              No results found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Results;
