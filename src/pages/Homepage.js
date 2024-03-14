import React from "react";
import HeroSection from "../components/Homepage/HeroSection";
import PopularMovies from "../components/Homepage/PopularMovies";
import TopRatedMovies from "../components/Homepage/TopRatedMovies";
import UpcomingMovies from "../components/Homepage/UpcomingMovies";

const Homepage = () => {
  return (
    <div className="bg-[#080D11]">
      <HeroSection />

      <div className="py-4">
        <UpcomingMovies />

        <PopularMovies />

        <TopRatedMovies />
      </div>
    </div>
  );
};

export default Homepage;
