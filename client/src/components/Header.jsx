import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearchPage = location.pathname === "/search";
  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <header className="lg:h-20 h-25 lg:shadow-sm sticky top-0 flex flex-col justify-center px-3 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center  justify-between ">
          {/* Logo */}
          <div className="w-[150px] lg:h-[70px] flex items-center">
            <Link to={"/"}>
              <img
                className="hidden lg:block object-cover"
                src={logo}
                alt="logo"
                srcset=""
              />
              <img
                className="lg:hidden block object-cover"
                src={logo}
                alt="logo"
                srcset=""
              />
            </Link>
          </div>

          {/* Search */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* Login & cart */}
          <div>
            {/* Mobile part */}
            <button className="text-neutral-600 lg:hidden">
              <FaRegCircleUser className="text-2xl " />
            </button>
            {/* Desktop part */}
            <div className="hidden lg:flex items-center gap-x-5">
              <button>
                {/* add to cart icon */}
                <div className="flex items-center gap-x-1 px-2 py-1 bg-black text-white rounded">
                  <div className="animate-bounce">
                    <TiShoppingCart size={35} />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-semibold text-xl">My Cart</p>
                    {/* <p>items: 1</p>
                    <p>Total price: 200</p> */}
                  </div>
                </div>
              </button>
              <button onClick={redirectToLoginPage} className="text-lg cursor-pointer px-2">Login</button>
            </div>
          </div>
        </div>
      )}

      {/* For mobile version search box */}
      <div className="container mx-auto lg:hidden flex gap-x-1">
        {isSearchPage && isMobile && (
          <Link to="/">
            <IoMdArrowRoundBack className="bg-white text-black h-11 w-11 rounded-md" />
          </Link>
        )}
        <Search />
      </div>
    </header>
  );
};

export default Header;
