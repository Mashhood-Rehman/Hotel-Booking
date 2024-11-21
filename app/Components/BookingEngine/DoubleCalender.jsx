import React, { useState } from "react";
import { format, addDays, startOfMonth, endOfMonth } from "date-fns";

const DoubleCalendar = () => {
  const today = new Date();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(today);
  const [selectedEndDate, setSelectedEndDate] = useState(addDays(today, 1));
  const [range, setRange] = useState({ start: today, end: addDays(today, 1) });

  const toggleCalendar = () => setCalendarOpen((prev) => !prev);

  const resetDates = () => {
    const today = new Date();
    setSelectedStartDate(today);
    setSelectedEndDate(addDays(today, 1));
    setRange({ start: today, end: addDays(today, 1) });
  };

  // Handle the click for the start date
  const handleStartDateClick = (date) => {
    setSelectedStartDate(date);
    if (date > selectedEndDate) {
      setSelectedEndDate(date);
    }
    setRange({ start: date, end: selectedEndDate });
  };

  // Handle the click for the end date
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
    const startOfMonthDate = startOfMonth(selectedDate);
    const endOfMonthDate = endOfMonth(selectedDate);

    // Get days from the start of the month to the end of the month
    for (
      let i = startOfMonthDate.getDate();
      i <= endOfMonthDate.getDate();
      i++
    ) {
      const currentDay = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i
      );
      const isSelected = currentDay >= range.start && currentDay <= range.end;

      days.push(
        <button
          key={i}
          type="button" // Prevent form submission
          onClick={() => handleDateClick(currentDay)}
          className={`p-2 rounded ${
            isSelected ? "bg-blue-600 text-white" : "text-black"
          } cursor-pointer`}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  const handleMonthChange = (isStart, direction) => {
    const updatedStartDate = new Date(selectedStartDate);
    updatedStartDate.setMonth(updatedStartDate.getMonth() + direction);
    if (isStart) {
      setSelectedStartDate(updatedStartDate);
    } else {
      setSelectedEndDate(updatedStartDate);
    }
  };

  return (
    <div className="relative">
      {/* Input Field */}
      <div className="flex items-center">
        <input
          type="text"
          readOnly
          onClick={toggleCalendar}
          value={`${format(selectedStartDate, "dd-MM-yyyy")} - ${format(
            selectedEndDate,
            "dd-MM-yyyy"
          )}`}
          className="border p-2 w-[25vw] focus:outline-none cursor-pointer"
        />
        {/* Cross Button */}
        <button
          type="button"
          onClick={resetDates}
          className="absolute top-2 right-2 text-xl text-gray-600"
        >
          &times;
        </button>
      </div>

      {calendarOpen && (
        <div className="absolute bg-white shadow-lg p-4 z-10 w-[45vw] transition-all duration-300">
          <div className="flex justify-between space-x-4">
            <div className="flex-1">
              <div className="flex p-2 justify-between items-center">
                <button
                  type="button"
                  onClick={() => handleMonthChange(true, -1)}
                >
                  Prev
                </button>
                <span className="text-xs">
                  {format(selectedStartDate, "MMMM yyyy")}
                </span>
                <button
                  type="button"
                  onClick={() => handleMonthChange(true, 1)}
                >
                  Next
                </button>
              </div>

              <div className="grid grid-cols-7">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center p-4 font-semibold text-xs text-gray-600"
                    >
                      {day}
                    </div>
                  )
                )}
                {renderCalendarDays(selectedStartDate, handleStartDateClick)}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex p-2 justify-between items-center">
                <button
                  type="button"
                  onClick={() => handleMonthChange(false, -1)}
                >
                  Prev
                </button>
                <span className="text-xs">
                  {format(selectedEndDate, "MMMM yyyy")}
                </span>
                <button
                  type="button"
                  onClick={() => handleMonthChange(false, 1)}
                >
                  Next
                </button>
              </div>

              <div className="grid grid-cols-7">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-semibold p-4 text-xs text-gray-600"
                    >
                      {day}
                    </div>
                  )
                )}
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
