import React from "react";
import HeroSection from "../components/Homepage/HeroSection";
import UpcomingMovies from "../components/Homepage/UpcomingMovies";

const Homepage = () => {
  return (
    <div className="bg-[#080D11]">
      <HeroSection />

      <UpcomingMovies />
    </div>
  );
};

export default Homepage;
