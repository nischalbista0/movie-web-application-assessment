import React, { useEffect, useRef, useState } from "react";
import { HiMenuAlt2, HiSearch } from "react-icons/hi";
import Slider from "react-slick";
import axios from "axios"; // Import Axios
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

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

      <div className="p-4 lg:p-6 lg:min-h-[calc(100vh_-_96px)] lg:flex lg:items-center lg:w-full">
        <div className="slider-container px-10 lg:px-20 relative lg:w-full">
          <Slider {...settings} ref={sliderRef}>
            {movies.map((movie, index) => (
              <div key={index} className="z-40 w-full h-full">
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
                      <button className="px-4 py-2 bg-[#0166F6] text-white rounded-lg transition-all duration-300 hover:bg-[#06224C]">
                        Watch Now
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
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
