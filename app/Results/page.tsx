// "use client";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Results() {
//   const searchParams = useSearchParams();
//   const city = searchParams.get("city");
//   const type = searchParams.get("type");

//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/search?city=${city}&type=${type}`
//         );
//         setResults(response.data);
//       } catch (error) {
//         console.error("Failed to fetch results:", error);
//       }
//     };

//     if (city && type) fetchData();
//   }, [city, type]);

//   return (
//     <div className="text-gray-300  text-3xl">
//       <h1>
//         Results for {city} - {type}
//       </h1>
//       <div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
//           {results && results.length > 0 ? (
//             results.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white shadow-xl rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-300"
//               >
//                 <h2 className="text-lg font-bold text-gray-700">{item.name}</h2>
//                 <p className="text-sm text-gray-500 mt-2">
//                   <span className="font-medium">Price:</span> ${item.price}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   <span className="font-medium">City:</span> {item.city}
//                 </p>

//                 <button className="mt-4 w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 transition">
//                   View Details
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-600 text-center col-span-full">
//               No results found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Results;

"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

type ResultItem = {
  name: string;
  price: number | string;
  city: string;
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
    <div className="text-gray-300 text-3xl">
      <h1>
        Results for {city} - {type}
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-300"
              >
                <h2 className="text-lg font-bold text-gray-700">{item.name}</h2>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-medium">Price:</span> ${item.price}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">City:</span> {item.city}
                </p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No results found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Results;
