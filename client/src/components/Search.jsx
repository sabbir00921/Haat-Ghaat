import React, { useEffect, useState, useRef } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const page = location.pathname === "/search";
    setIsSearchPage(page);

    if (page && inputRef.current) {
      inputRef.current.focus();
    }
  }, [location]);

  const handleClick = () => {
    if (isSearchPage) {
      inputRef.current && inputRef.current.focus();
    } else {
      navigate("/search");

      setTimeout(() => {
        inputRef.current && inputRef.current.focus();
      }, 50);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full flex items-center text-2xl min-w-[300px] lg:min-w-[420px] h-11 rounded-lg shadow-md border border-gray-200 text-gray-400 bg-slate-100 p-2 focus-within:border-blue-400 group"
    >
      <button className="flex justify-center items-center group-focus-within:text-amber-700">
        <IoSearch />
      </button>
      <div className="text-sm w-full">
        {!isSearchPage ? (
          <div className="flex items-center">
            <TypeAnimation
              sequence={[
                "Search milk",
                2000,
                "Search foods",
                2000,
                "Search gadgets",
                2000,
                "Search cloth",
                2000,
              ]}
              wrapper="span"
              speed={20}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div>
            <input
              ref={inputRef}
              className="w-full p-1 outline-0 text-black"
              type="text"
              placeholder="Search products you want..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
