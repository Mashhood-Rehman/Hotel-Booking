// CustomCalendar.jsx
import React, { useState, useEffect, useRef } from "react";
import { format, addDays } from "date-fns";

const CustomCalendar = () => {
  const today = new Date();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [range, setRange] = useState({
    start: today,
    end: addDays(today, 1),
  });

  // Toggle calendar on input click
  const toggleCalendar = () => {
    setCalendarOpen((prev) => !prev);
  };

  // Handle date selection
  const handleDateClick = (date) => {
    if (!range.start || (range.start && range.end)) {
      // Start new range selection
      setRange({ start: date, end: null });
    } else {
      // Set end date
      const newEndDate = date > range.start ? date : range.start;
      const newStartDate = date > range.start ? range.start : date;
      setRange({ start: newStartDate, end: newEndDate });
    }
  };

  // Render calendar days
  const renderCalendarDays = () => {
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
          className={`p-2 rounded ${isSelected ? "bg-[#c4a053] text-white" : "text-black"} ${
            "cursor-pointer"
          }`}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="relative">
      <input
        type="text"
        readOnly
        onClick={toggleCalendar}
        value={`${range.start ? format(range.start, "dd-MM-yyyy") : "Start Date"} - ${
          range.end ? format(range.end, "dd-MM-yyyy") : "End Date"
        }`}
        className="border p-2 rounded cursor-pointer w-full max-w-5xl"
      />

      {calendarOpen && (
        <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 mt-2 z-10">
          {/* Calendar Navigation */}
          <div className="flex justify-between items-center mb-2">
            <button onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}>
              Prev
            </button>
            <span className=" text-xs">{format(selectedDate, "MMMM yyyy")}</span>
            <button onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}>
              Next
            </button>
          </div>

          {/* Days of the Week Headers */}
          <div className="grid grid-cols-7 gap-2 mt-4">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
              <div key={day} className="text-center font-semibold text-xs text-gray-600">
                {day}
              </div>
            ))}
            {/* Calendar Days */}
            {renderCalendarDays()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
