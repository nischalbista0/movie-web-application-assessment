import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
import {
  AiOutlineClockCircle,
  AiOutlineDollarCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { BiCameraMovie, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaArrowLeft, FaGlobe, FaMaximize, FaStar } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import { IoClose, IoStatsChart } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const MovieDetails = ({ match }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState([]);
  const [movieImages, setMovieImages] = useState([]);
  const [showAllCast, setShowAllCast] = useState(false);

  const carouselRef = useRef(null);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchMovieCredits = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );
        setMovieCredits(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    const fetchMovieImages = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/images`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );
        setMovieImages(response.data.backdrops);
      } catch (error) {
        console.error("Error fetching movie images:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieCredits();
    fetchMovieImages();
  }, [id]);

  const toggleShowAllCast = () => {
    setShowAllCast(!showAllCast);
  };

  if (!movieDetails || movieCredits.length === 0) {
    return (
      <div className="bg-[#090E12] w-screen h-screen flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#090E12] min-w-screen min-h-screen overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
          alt={movieDetails.title}
          className="w-full object-cover h-screen"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#090e1276] to-[#090E12]"></div>
      </div>

      <div className="relative z-20 p-4 lg:p-6 min-h-screen flex flex-col justify-center">
        <button
          className="text-white absolute top-6 left-6  flex items-center gap-2 text-xl font-bold transition-all duration-300 hover:text-blue-500"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-2xl" />
          Back
        </button>

        <div className="flex flex-col lg:flex-row items-center gap-8 mt-12 lg:mt-4 lg:w-[60%]">
          <div className="max-h-[350px] lg:min-w-[250px] lg:max-h-none">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="rounded-lg w-full max-h-[350px] lg:max-h-none object-cover shadow-xl"
            />
          </div>

          <div className="flex flex-col gap-8 self-start lg:self-center">
            <div className="flex flex-col gap-2 lg:gap-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                {movieDetails.title}
              </h1>

              {movieDetails.overview && (
                <p className="text-white block">{movieDetails.overview}</p>
              )}

              {movieDetails.tagline && (
                <p className="text-gray-400 text-sm italic lg:text-base">
                  {movieDetails.tagline}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {movieDetails.runtime && (
                <div className="flex gap-2 items-center">
                  <AiOutlineClockCircle className="text-gray-400 text-xl" />
                  <p className="text-white">
                    Runtime: {movieDetails.runtime} minutes
                  </p>
                </div>
              )}

              {movieDetails.budget && (
                <div className="flex gap-2 items-center">
                  <AiOutlineDollarCircle className="text-gray-400 text-xl" />
                  <p className="text-white">
                    Budget: ${movieDetails.budget.toLocaleString()}
                  </p>
                </div>
              )}

              {movieDetails.revenue && (
                <div className="flex gap-2">
                  <GiCash className="text-gray-400 text-xl" />
                  <p className="text-white">
                    Revenue: ${movieDetails.revenue.toLocaleString()}
                  </p>
                </div>
              )}

              {movieDetails.homepage && (
                <div className="flex gap-2">
                  <FaGlobe className="text-gray-400 text-xl" />

                  <div className="flex items-center gap-1">
                    <p className="text-white">Website:</p>
                    <a
                      href={movieDetails.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#5CA1FF] hover:underline"
                    >
                      {movieDetails.homepage}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <IoStatsChart className="text-green-600 text-sm sm:text-base" />

                <p className="text-white text-xs sm:text-sm relative top-0.5">
                  {movieDetails.popularity}{" "}
                  <span className="text-gray-400">points</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <FaStar className="text-[#FFD700] text-sm sm:text-base" />

                <p className="text-white text-xs sm:text-sm relative top-0.5">
                  {movieDetails.vote_average.toFixed(2)}/10{" "}
                  <span className="text-gray-400">
                    ({movieDetails.vote_count})
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#090E12] w-full px-4 lg:px-6 pb-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-400 font-bold text-lg">Genres:</h1>
            <div className="flex flex-wrap gap-2">
              {movieDetails.genres &&
                movieDetails.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1.5 bg-gray-700 rounded-full text-white text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-gray-400 font-bold text-lg">
              Production Companies:
            </h1>
            <div className="flex flex-wrap gap-3">
              {movieDetails.production_companies &&
                movieDetails.production_companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center gap-2 bg-gray-700 rounded-full px-3 py-1"
                  >
                    {company.logo_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                        alt={company.name}
                        className="w-6 h-6"
                      />
                    ) : (
                      <BiCameraMovie className="text-white text-lg" />
                    )}
                    <span className="text-white text-sm">{company.name}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-gray-400 font-bold text-lg">
              Production Countries:
            </h1>
            <div className="flex flex-wrap gap-2">
              {movieDetails.production_countries &&
                movieDetails.production_countries.map((production_country) => (
                  <span
                    key={production_country.iso_3166_1}
                    className="px-3 py-1.5 bg-gray-700 rounded-full text-white text-sm"
                  >
                    {production_country.name}
                  </span>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-gray-400 font-bold text-lg">
              Languages Spoken:
            </h1>
            <div className="flex flex-wrap gap-2">
              {movieDetails.spoken_languages &&
                movieDetails.spoken_languages.map((language) => (
                  <span
                    key={language.iso_639_1}
                    className="px-3 py-1.5 bg-gray-700 rounded-full text-white text-sm"
                  >
                    {language.name}
                  </span>
                ))}
            </div>
          </div>

          <div className=" text-white flex flex-col gap-2">
            <h1 className="text-gray-400 font-bold text-lg">Cast</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {showAllCast
                ? movieCredits.map((credit) => (
                    <div
                      key={credit.id}
                      className="bg-gray-800 p-4 rounded-lg flex items-center"
                    >
                      {credit.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${credit.profile_path}`}
                          alt={credit.name}
                          className="w-12 h-12 rounded-full mr-2"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                          <AiOutlineUser className="text-2xl" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold">{credit.name}</h3>
                        <p className="text-gray-400">{credit.character}</p>
                      </div>
                    </div>
                  ))
                : movieCredits.slice(0, 20).map((credit) => (
                    <div
                      key={credit.id}
                      className="bg-gray-800 p-4 rounded-lg flex items-center"
                    >
                      {credit.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${credit.profile_path}`}
                          alt={credit.name}
                          className="w-12 h-12 rounded-full mr-2"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                          <AiOutlineUser className="text-2xl" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold">{credit.name}</h3>
                        <p className="text-gray-400">{credit.character}</p>
                      </div>
                    </div>
                  ))}
            </div>
            {!showAllCast && movieCredits.length > 4 && (
              <button
                onClick={toggleShowAllCast}
                className="text-blue-500 hover:text-white transition-all duration-300"
              >
                Show All
              </button>
            )}
            {showAllCast && (
              <button
                onClick={toggleShowAllCast}
                className="text-blue-500 hover:text-white transition-all duration-300"
              >
                Show Less
              </button>
            )}
          </div>

          <div className="h-[700px] flex flex-col gap-4">
            <h1 className="text-gray-400 font-bold text-lg">Related Images</h1>

            <div className="carousel-container" style={{ height: "100%" }}>
              <Carousel
                ref={carouselRef}
                images={movieImages.map((image) => ({
                  src: `https://image.tmdb.org/t/p/original${image.file_path}`,
                }))}
                isMaximized={false}
                hasMediaButton={false}
                hasIndexBoard={false}
                maxIcon={
                  <span className="icon-text" role="img" aria-label="max">
                    <FaMaximize className="text-white text-3xl m-4" />
                  </span>
                }
                minIcon={
                  <span className="icon-text" role="img" aria-label="min">
                    <IoClose className="text-white text-3xl m-4" />
                  </span>
                }
                leftIcon={
                  <span className="icon-text" role="img" aria-label="left">
                    <BiChevronLeft className="text-white text-5xl m-4" />
                  </span>
                }
                rightIcon={
                  <span
                    className="icon-text"
                    role="img"
                    aria-label="right"
                    style={{
                      fontSize: "min(50px, 5vw)",
                    }}
                  >
                    <BiChevronRight className="text-white text-5xl m-4" />
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
