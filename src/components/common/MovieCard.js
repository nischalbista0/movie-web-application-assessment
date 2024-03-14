import React, { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { LuView } from "react-icons/lu";
import { MdLanguage } from "react-icons/md";

const MovieCard = ({ movie }) => {
  const [isMovieHovered, setIsMovieHovered] = useState(false);

  const changeLanguageCodeToName = (code) => {
    const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
    return languageNames.of(code);
  };

  return (
    <div className="relative px-2 lg:px-3">
      <div className="cursor-pointer">
        <div className="flex flex-col gap-2">
          <div
            className="relative"
            onMouseOver={() => setIsMovieHovered(true)}
            onMouseLeave={() => setIsMovieHovered(false)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-xl"
            />

            <div className="absolute z-20 right-3 top-3 flex items-center gap-1 bg-[#0055CC] rounded-full px-2 py-0.5 text-sm text-white font-medium">
              <MdLanguage className="text-white" />
              <p>{changeLanguageCodeToName(movie.original_language)}</p>
            </div>

            <div
              className={`absolute inset-0 bg-[#0000004b] to-transparent rounded-xl transition-all duration-500 z-10 flex justify-center items-center ${
                isMovieHovered ? "hover:bg-[#090e12bd]" : ""
              }`}
            >
              <div
                className={`flex flex-col items-center gap-4 ${
                  isMovieHovered
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                } transition-all duration-500
              }`}
              >
                <button className="bg-[#084DB2] rounded-full w-[150px] h-10 flex items-center gap-1.5 justify-center text-white text-sm font-medium">
                  <HiInformationCircle className="text-xl" />
                  View Details
                </button>

                <button className="bg-[#084DB2] rounded-full w-[150px] h-10 flex items-center gap-1.5 justify-center text-white text-sm font-medium">
                  <LuView className="text-lg" />
                  Quick View
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-white text-sm sm:text-base font-bold">
              {movie.title}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              {movie.release_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
