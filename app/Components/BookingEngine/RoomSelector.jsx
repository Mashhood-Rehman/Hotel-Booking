import { useState } from "react";

export default function RoomSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [details, setDetails] = useState("");

  const handleConfirm = () => {
    setDetails(`${rooms} Room(s), ${adults} Adult(s)`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-72">
      {/* Input Field */}
      <input
        type="text"
        className="w-full p-2 border focus:outline-none cursor-pointer"
        placeholder="Select Rooms and Guests"
        onClick={() => setIsOpen(!isOpen)}
        readOnly
        value={details}
      />

      {isOpen && (
        <div className="absolute top-12 left-0 w-full bg-white border rounded-lg shadow-md p-4 z-10">
          <div className="flex justify-between mb-2">
            <span>Rooms:</span>
            <div>
              <button
                type="button"  // Prevent form submission
                className="px-2 py-1 border rounded-md"
                onClick={() => setRooms((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="px-3">{rooms}</span>
              <button
                type="button"  // Prevent form submission
                className="px-2 py-1 border rounded-md"
                onClick={() => setRooms((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <span>Adults:</span>
            <div>
              <button
                type="button"  // Prevent form submission
                className="px-2 py-1 border rounded-md"
                onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="px-3">{adults}</span>
              <button
                type="button"  // Prevent form submission
                className="px-2 py-1 border rounded-md"
                onClick={() => setAdults((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}
