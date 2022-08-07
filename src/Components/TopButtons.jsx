import React from "react";
import { nanoid } from "nanoid";


export const TopButtons = ({setQuerry}) => {
  const cities = [
    {
      id: 1,
      title: "Delhi",
    },
    {
      id: 2,
      title: "Mumbai",
    },
    {
      id: 3,
      title: "Kolkata",
    },
    {
      id: 4,
      title: "Mangalore",
    },
    {
      id: 5,
      title: "Chennai",
    },
  ];
  return (
    <div className="flex items-center justify-around my-6">
        {cities.map(city=>(
            <button 
            onClick={()=>setQuerry({q:city.title})}
            key={nanoid()}
             className="text-white text-lg font-medium"
             >
              {city.title}
             </button>
        ))}
    </div>
  );
};
