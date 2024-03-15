// HeroSection.js
import axios from "axios";
import { atom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Header from "../common/Header";
import HeroMovieDetails from "./HeroMovieDetails";

export const searchClickedAtom = atom(false);

const HeroSection = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [movies, setMovies] = useState([]);

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

  const CustomNextButton = () => (
    <button
      className="absolute top-1/2 -right-12 lg:-right-16 transform -translate-y-1/2"
      onClick={() => sliderRef.current.slickNext()}
    >
      <FaChevronRight className="text-white text-3xl lg:text-4xl transition-all duration-300 hover:text-[#5CA1FF]" />
    </button>
  );

  const CustomPrevButton = () => (
    <button
      className="absolute top-1/2 -left-12 lg:-left-16 transform -translate-y-1/2 "
      onClick={() => sliderRef.current.slickPrev()}
    >
      <FaChevronLeft className="text-white text-3xl lg:text-4xl transition-all duration-300 hover:text-[#5CA1FF]" />
    </button>
  );

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    fade: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomNextButton />,
    prevArrow: <CustomPrevButton />,
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
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          </div>
        </div>{" "}
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#090E12]">
      <div className="w-full h-full absolute top left-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movies[currentSlide].backdrop_path}`}
          alt="hero"
          className="bg-img w-full h-full object-cover opacity-10 transition-all duration-300"
        />
      </div>

      <Header />

      <div className="p-4 lg:p-6 min-h-[calc(100vh_-_96px)] flex flex-col justify-center lg:flex-row lg:items-center lg:w-full">
        <div className="px-10 lg:px-20 relative lg:w-full">
          <Slider {...settings} ref={sliderRef}>
            {movies.map((movie, index) => (
              <div key={index}>
                <HeroMovieDetails movie={movie} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
