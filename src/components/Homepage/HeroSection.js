import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Header from "../common/Header";
import HeroMovieDetails from "./HeroMovieDetails";
import { HiChevronLeft } from "react-icons/hi";

const HeroSection = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [movies, setMovies] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  const handleBackClick = () => {
    setSearchClicked(false);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, []);

  const CustomNextButtom = () => (
    <button
      className="absolute top-1/2 -right-16 transform -translate-y-1/2"
      onClick={() => sliderRef.current.slickNext()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-white transition-all duration-300 hover:text-[#5CA1FF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );

  const CustomPrevButtom = () => (
    <button
      className="absolute top-1/2 -left-16 transform -translate-y-1/2 -translate-x-4"
      onClick={() => sliderRef.current.slickPrev()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-white transition-all duration-300 hover:text-[#5CA1FF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    fade: true,
    autoplaySpeed: 4000,
    nextArrow: <CustomNextButtom />,
    prevArrow: <CustomPrevButtom />,
    afterChange: (index) => {
      setCurrentSlide(index);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (movies.length === 0) {
    return (
      <div className="bg-[#090E12] w-screen h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#5CA1FF] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#090E12]">
      <div className="w-full h-full absolute top left-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movies[currentSlide].poster_path}`}
          alt="hero"
          className="bg-img w-full h-full object-cover opacity-5 transition-all duration-300"
        />
      </div>

      <Header handleSearchClick={handleSearchClick} />

      <div className="p-4 lg:p-6 lg:min-h-[calc(100vh_-_96px)] lg:flex lg:items-center lg:w-full">
        <div className="slider-container px-10 lg:px-20 relative lg:w-full">
          <Slider {...settings} ref={sliderRef}>
            {movies.map((movie, index) => (
              <HeroMovieDetails key={index} movie={movie} />
            ))}
          </Slider>
        </div>
      </div>

      <div
        className={`w-screen h-screen bg-[#090e12e9] fixed top-0 left-0 z-50 transition-all duration-300 ${
          searchClicked
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } ${searchValue !== "" ? "bg-[#090e12]" : "bg-[#090e12e9]"}`}
      >
        <div className="w-full p-4 lg:p-6 h-full">
          <div className="bg-[#090E12] flex items-center gap-2">
            <button onClick={handleBackClick} className="relative top-2">
              <HiChevronLeft className="text-3xl lg:text-4xl text-white transition-all duration-300 hover:text-[#5CA1FF]" />
            </button>

            <div className="w-full h-full flex items-center justify-center">
              <input
                type="text"
                placeholder="Search for movies..."
                className="w-11/12 h-12 lg:h-16 bg-[#090E12] border-b-2 border-[#5CA1FF] text-white text-lg lg:text-xl focus:outline-none"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
