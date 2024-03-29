import { useAtom } from "jotai";
import React, { useState } from "react";
import { HiMenuAlt2, HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { searchClickedAtom } from "../Homepage/HeroSection";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("home");
  const [, setSearchClicked] = useAtom(searchClickedAtom);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (menuItem) => {
    setSelected(menuItem);
    setMenuOpen(false);
  };

  return (
    <header className="relative flex z-10 p-4 lg:p-6 items-center justify-between gap-4">
      <button onClick={toggleMenu} className="relative z-20">
        <HiMenuAlt2 className="text-2xl lg:text-3xl text-white transition-all duration-300 hover:text-[#5CA1FF]" />
      </button>

      <div
        className={`menu-container z-[80] fixed left-0 top-0 w-full min-h-screen bg-[#090e12d6] transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute z-[80] left-0 top-0 w-[300px] min-h-screen bg-[#090E12] transition-all duration-300 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button onClick={toggleMenu} className="p-4 lg:p-6">
            <HiMenuAlt2 className="text-2xl lg:text-3xl text-white transition-all duration-300 hover:text-[#5CA1FF]" />
          </button>

          <div className="flex flex-col items-center gap-10">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Movieweb_Logo.png"
              alt="logo"
              className="w-36"
            />

            <div className="w-full flex flex-col gap-4">
              <div
                onClick={() => {
                  handleMenuClick("home");
                  navigate("/");
                }}
                className={`relative flex font-medium items-center gap-4 cursor-pointer ${
                  selected === "home" ? "text-white" : "text-[#919BB4]"
                } transition-all duration-300`}
              >
                <div
                  className={`w-1.5 h-7 rounded-md bg-[#5CA1FF] ${
                    selected === "home" ? "opacity-100" : "opacity-0"
                  } transition-all duration-300`}
                ></div>

                <div>Home</div>
              </div>

              <div
                onClick={() => handleMenuClick("Upcoming")}
                className={`relative flex font-medium items-center gap-4 cursor-pointer ${
                  selected === "Upcoming" ? "text-white" : "text-[#919BB4]"
                } transition-all duration-300`}
              >
                <div
                  className={`w-1.5 h-7 rounded-md bg-[#5CA1FF] ${
                    selected === "Upcoming" ? "opacity-100" : "opacity-0"
                  } transition-all duration-300`}
                ></div>

                <div>Upcoming</div>
              </div>

              <div
                onClick={() => handleMenuClick("Popular")}
                className={`relative flex font-medium items-center gap-4 cursor-pointer ${
                  selected === "Popular" ? "text-white" : "text-[#919BB4]"
                } transition-all duration-300`}
              >
                <div
                  className={`w-1.5 h-7 rounded-md bg-[#5CA1FF] ${
                    selected === "Popular" ? "opacity-100" : "opacity-0"
                  } transition-all duration-300`}
                ></div>

                <div>Popular</div>
              </div>

              <div
                onClick={() => handleMenuClick("TopRated")}
                className={`relative flex font-medium items-center gap-4 cursor-pointer ${
                  selected === "TopRated" ? "text-white" : "text-[#919BB4]"
                } transition-all duration-300`}
              >
                <div
                  className={`w-1.5 h-7 rounded-md bg-[#5CA1FF] ${
                    selected === "TopRated" ? "opacity-100" : "opacity-0"
                  } transition-all duration-300`}
                ></div>

                <div>Top rated</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="items-center gap-10 flex">
        <li className="cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Movieweb_Logo.png"
            alt="logo"
            className="w-36"
          />
        </li>
      </ul>

      <button onClick={() => setSearchClicked(true)}>
        <HiSearch className="text-2xl lg:text-3xl text-white transition-all duration-300 hover:text-[#5CA1FF]" />
      </button>
    </header>
  );
};

export default Header;
