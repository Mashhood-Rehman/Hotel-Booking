"use client";


import CustomCalendar from "./CustomCalendar";
import DoubleCalendar from "./DoubleCalender";
import RoomSelector from "./RoomSelector"
 function Page() {  
 

  return (
    <div className=" ">
      <div className="p-6 flex  space-x-6 bg-opacity-55">
        <form action="" className=" flex space-x-4">

    <select
      className="p-2  focus:outline-none"
      defaultValue="" 
    >
      <option value="" disabled>
        Select Option
      </option>
      <option value="hotel">Hotel</option>
      <option value="apartment">Apartment</option>
    </select>
    <select
      className="p-2  focus:outline-none"
      defaultValue="" 
    >
      <option value="" disabled>
        Select Option
      </option>
      <option value="Lahore">Lahore</option>
    </select>





       <div className=" block lg:hidden">

        <CustomCalendar/>
       </div>
<div className=" hidden lg:block">

       <DoubleCalendar />
</div>


<div>
  <RoomSelector />
</div>

<div className=" bg-blue-600 text-white flex items-center justify-center py-1  px-3 ">

<button type="submit">Search</button>
</div>

        </form>
       
      </div>
    </div>
  );
}

export default Page;
