"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Added useRouter hook for navigation
import queryString from "query-string";
import CustomCalendar from "./CustomCalendar";
import DoubleCalendar from "./DoubleCalender";
import RoomSelector from "./RoomSelector";
import axios from "axios";
import List from "../../List/page";

function Page() {
  const router = useRouter(); // Initialize useRouter for redirection
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [city, setCity] = useState("Lahore");
  const [type, setType] = useState("hotel");
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = async () => {
    // Validate city and type selection
    if (!city || !type) {
      setError("Please select a city and type.");
      return;
    }

    setLoading(true);
    setIsSearched(false);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:3000/api/search?city=${city}&type=${type}`
      );
      setData(response.data);
      setLoading(false);
      setIsSearched(true);

      if (response.data && response.data.length > 0) {
        // Use queryString to construct the URL with query parameters
        const query = queryString.stringify({ city, type });
        router.push(`/Results?${query}`); // Redirect to Results page with query parameters
      } else {
        setError("No results found!");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <div className="p-6 flex space-x-6 bg-opacity-55">
        <form onSubmit={(e) => e.preventDefault()} className="flex space-x-4">
          <select
            className="p-2 focus:outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="hotel">Hotel</option>
            <option value="apartment">Apartment</option>
          </select>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 focus:outline-none"
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="Lahore">Lahore</option>
          </select>

          <div className="block lg:hidden">
            <CustomCalendar />
          </div>
          <div className="hidden lg:block">
            <DoubleCalendar />
          </div>

          <div>
            <RoomSelector />
          </div>

          <div className="bg-blue-600 text-white flex items-center justify-center py-1 px-3">
            <button type="button" disabled={loading} onClick={handleSearch}>
              {loading ? "Loading..." : "Search"}
            </button>
          </div>
        </form>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Page;
