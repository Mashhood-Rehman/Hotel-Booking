"use client";

import React from "react";

import CustomCalendar from "./CustomCalendar";
import DoubleCalendar from "./DoubleCalender";
function Page() {
 

  

  return (
    <div className="">
      <div className="p-6 flex flex-col space-y-4 bg-opacity-55">
        <form action="
        ">
          <div className=" space-x-3">

          <form action="">
  <div className="space-x-3">
    <select
      className="p-2 rounded-lg focus:outline-none"
      defaultValue="" 
    >
      <option value="" disabled>
        Select Option
      </option>
      <option value="hotel">Hotel</option>
      <option value="apartment">Apartment</option>
    </select>
    <select
      className="p-2 rounded-lg focus:outline-none"
      defaultValue="" 
    >
      <option value="" disabled>
        Select Option
      </option>
      <option value="Lahore">Lahore</option>
    </select>


  </div>
</form>

          </div>

        </form>

       <div className=" block lg:hidden">

        <CustomCalendar/>
       </div>
<div className=" hidden lg:block">

       <DoubleCalendar />
</div>

       
      </div>
    </div>
  );
}

export default Page;
