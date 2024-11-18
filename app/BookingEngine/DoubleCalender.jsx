import React, { useState } from "react";
import { format, addDays } from "date-fns";

const DoubleCalendar = () => {
  const today = new Date();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(today);
  const [selectedEndDate, setSelectedEndDate] = useState(addDays(today, 1));
  const [range, setRange] = useState({ start: today, end: addDays(today, 1) });

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setCalendarOpen((prev) => !prev);
  };

  // Reset both dates
  const resetDates = () => {
    setSelectedStartDate(today);
    setSelectedEndDate(addDays(today, 1));
    setRange({ start: today, end: addDays(today, 1) });
  };

  // Handle start date selection
  const handleStartDateClick = (date) => {
    setSelectedStartDate(date);
    if (date > selectedEndDate) {
      setSelectedEndDate(date);
    }
    setRange({ start: date, end: selectedEndDate });
  };

  // Handle end date selection
  const handleEndDateClick = (date) => {
    setSelectedEndDate(date);
    if (date < selectedStartDate) {
      setSelectedStartDate(date);
    }
    setRange({ start: selectedStartDate, end: date });
    setCalendarOpen(false); 
  };

  const renderCalendarDays = (selectedDate, handleDateClick) => {
    const days = [];
    const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      const currentDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      const isSelected = currentDay >= range.start && currentDay <= range.end;

      days.push(
        <button
          key={i}
          onClick={() => handleDateClick(currentDay)}
          className={`p-2 rounded ${isSelected ? "bg-[#c4a053] text-white" : "text-black"} cursor-pointer`}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="relative ">
      {/* Input Field */}
      <div className="flex items-center  w-[45vw]  relative">
        <input
          type="text"
          readOnly
          onClick={toggleCalendar}
          value={`${format(selectedStartDate, "dd-MM-yyyy")} - ${format(selectedEndDate, "dd-MM-yyyy")}`}
          className="border p-2 rounded w-full focus:outline-none cursor-pointer " 
        />
        {/* Cross Button */}
        <button
          onClick={resetDates}
          className="absolute top-2 right-2 text-xl text-gray-600"
        >
          &times;
        </button>
      </div>

      {/* Calendar Tab (appears on input click) */}
      {calendarOpen && (
        <div className="absolute  left-0 bg-white shadow-lg  p-4  z-10 w-full max-w-2xl transition-all duration-300">
          {/* Flexbox container to display calendars side by side */}
          <div className="flex justify-between space-x-4">
            {/* Start Calendar */}
            <div className="flex-1">
              <div className="flex p-4 justify-between items-center mb-2">
                <button
                  onClick={() => setSelectedStartDate(new Date(selectedStartDate.setMonth(selectedStartDate.getMonth() - 1)))}
                >
                  Prev
                </button>
                <span className="text-xs">{format(selectedStartDate, "MMMM yyyy")}</span>
                <button
                  onClick={() => setSelectedStartDate(new Date(selectedStartDate.setMonth(selectedStartDate.getMonth() + 1)))}
                >
                  Next
                </button>
              </div>

              <div className="grid grid-cols-7 p-4 gap-2 ">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                  <div key={day} className="text-center p-4 font-semibold text-xs text-gray-600">
                    {day}
                  </div>
                ))}
                {/* Render Start Calendar Days */}
                {renderCalendarDays(selectedStartDate, handleStartDateClick)}
              </div>
            </div>

            {/* End Calendar */}
            <div className="flex-1">
              <div className="flex p-4 justify-between items-center mb-2">
                <button
                  onClick={() => setSelectedEndDate(new Date(selectedEndDate.setMonth(selectedEndDate.getMonth() - 1)))}
                >
                  Prev
                </button>
                <span className="text-xs">{format(selectedEndDate, "MMMM yyyy")}</span>
                <button
                  onClick={() => setSelectedEndDate(new Date(selectedEndDate.setMonth(selectedEndDate.getMonth() + 1)))}
                >
                  Next
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 p-4">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                  <div key={day} className="text-center font-semibold p-4 text-xs text-gray-600">
                    {day}
                  </div>
                ))}
                {/* Render End Calendar Days */}
                {renderCalendarDays(selectedEndDate, handleEndDateClick)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoubleCalendar;
