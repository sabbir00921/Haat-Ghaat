import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";

const Header = () => {
  return (
    <header className="h-20 shadow-sm sticky top-0">
      <div className="container mx-auto flex items-center h-full justify-between px-3">
        {/* Logo */}
        <div className="w-[120px] h-[60px] flex items-center">
          <picture>
            <img className="hidden lg:block" src={logo} alt="logo" srcset="" />
            <img className="lg:hidden block" src={logo} alt="logo" srcset="" />
          </picture>
        </div>

        {/* Search */}
        <div>
          <Search />
        </div>

        {/* Login & cart */}
        <div>Login & cart</div>
      </div>
    </header>
  );
};

export default Header;
