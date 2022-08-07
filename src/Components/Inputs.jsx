import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";

export const Inputs = ({setQuerry,units,setUnits}) => {
  const [city,setCity]=useState("");

  const handleSearchClick=()=>{
       if(city !=="") setQuerry({q:city})
  };

  const handleLocationClick=()=>{
     if(navigator.geolocation){

      navigator.geolocation.getCurrentPosition((position)=>{
        let lat= position.coords.latitude;
        let lon= position.coords.longitude;
        setQuerry({lat,lon});
      })
     }
  }
     
  const handleUnitChange=(e)=>{
       const selected= e.currentTarget.name
       if(units !==selected) setUnits(selected);
  }



  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row justify-center w=3/4 items-center space-x-4">
        <input
          type={"text"}
          value={city}
          onChange={(e)=>setCity(e.currentTarget.value)}
          placeholder="Search for city...."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
        <FaSearch
        onClick={handleSearchClick}
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
        <ImLocation2
        onClick={handleLocationClick}
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        
        <button 
        onClick={handleUnitChange}
        name="metric"
         className="text-xl text-white font-light transition ease-out" 
         >
          °C
       </button>
        <p className="text-xl text-white mx-2">|</p>
        <button
         onClick={handleUnitChange} 
        name="imperial" 
        className="text-xl text-white font-light transition ease-out" >°F </button>
      </div>
    </div>
  );
};
