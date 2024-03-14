import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import MovieCard from "../common/MovieCard";
import SliderNavButtons from "../common/SliderNavButtons";

const PopularMovies = () => {
  const sliderRef = useRef(null);
  const [popularMovies, setPopularMovies] = useState([]);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    initialSlide: 0,
    nextArrow: <></>,
    prevArrow: <></>,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
        },
      })
      .then((res) => {
        setPopularMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(popularMovies);

  return (
    <div className="p-4 lg:p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-lg text-white sm:text-xl font-bold lg:text-2xl">
          Popular Movies
        </h1>

        <SliderNavButtons onNext={handleNext} onPrev={handlePrev} />
      </div>

      <div className="">
        <Slider {...settings} ref={sliderRef}>
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} type="popular" />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PopularMovies;