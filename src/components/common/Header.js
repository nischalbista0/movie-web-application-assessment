import React from "react";
import { HiMenuAlt2, HiSearch } from "react-icons/hi";

const Header = () => {
  return (
    <header className="relative flex z-10 p-4 lg:p-6 items-center justify-between gap-4">
      <button>
        <HiMenuAlt2 className="text-2xl lg:text-3xl text-white transition-all duration-300 hover:text-[#5CA1FF]" />
      </button>

      <ul className="items-center gap-10 hidden lg:flex">
        <li>
          <a href="#" className="text-white">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-white">
            About
          </a>
        </li>
        <li>
          <img
            src="https://www.freeiconspng.com/thumbs/movie-icon/movie-icon-27.png"
            alt="logo"
            className="w-12 h-12"
          />
        </li>
        <li>
          <a href="#" className="text-white">
            Services
          </a>
        </li>
        <li>
          <a href="#" className="text-white">
            Contact
          </a>
        </li>
      </ul>

      <button>
        <HiSearch className="text-2xl lg:text-3xl text-white transition-all duration-300 hover:text-[#5CA1FF]" />
      </button>
    </header>
  );
};

export default Header;
