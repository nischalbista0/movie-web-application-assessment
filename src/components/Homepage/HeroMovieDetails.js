import React from "react";
import { HiInformationCircle } from "react-icons/hi";

const HeroMovieDetails = ({ movie, key }) => {
  return (
    <div key={key} className="z-40 w-full h-full">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-14 lg:w-full">
        <div className="w-full lg:w-[30%]">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            className="object-cover w-full max-h-[350px] lg:max-h-max lg:h-[400px] xl:h-[450px] rounded-xl shadow-xl"
            alt={movie.title}
          />
        </div>

        <div className="flex-1 py-4 flex flex-col gap-4 lg:gap-6 justify-between">
          <div className="flex flex-col gap-2 lg:gap-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              {movie.title}
            </h1>

            <p className="text-white">{movie.overview}</p>
          </div>

          <div>
            <button className="px-5 flex items-center gap-1 py-2 bg-[#0166F6] text-white rounded-full transition-all duration-300 hover:bg-[#0167f6bd]">
              <HiInformationCircle className="text-2xl" />
              View Details
            </button>
          </div>

          <div className="flex gap-10">
            <div className="flex gap-2">
              <p className="text-gray-400">Rating:</p>
              <p className="text-white">{movie.vote_average}/10</p>
            </div>

            <div className="flex gap-2">
              <p className="text-gray-400">Release Date:</p>
              <p className="text-white">{movie.release_date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMovieDetails;
