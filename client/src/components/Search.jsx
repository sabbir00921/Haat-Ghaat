import React from "react";
import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from "react-type-animation";
const Search = () => {
  return (
    <div className="w-full flex items-center text-2xl min-w-[300px] lg:min-w-[420px] h-12 rounded-lg  shadow-md border border-gray-200 text-gray-400">
      <button className="flex justify-center items-center p-3">
        <IoSearch />
      </button>
      <div className="flex items-center">
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Search milk",
            2000, // wait 1s before replacing "Mice" with "Hamsters"
            "Search foods",
            2000,
            "Search gadtes",
            2000,
            "Search cloth",
            2000,
          ]}
          wrapper="span"
          speed={20}
          className="text-sm"
          repeat={Infinity}
        />
      </div>
    </div>
  );
};

export default Search;
