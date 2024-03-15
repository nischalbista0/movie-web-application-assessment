import axios from "axios";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClockCircle, AiOutlineDollarCircle } from "react-icons/ai";
import { BiCameraMovie } from "react-icons/bi";
import { FaGlobe } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import { HiInformationCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { selectedMovieAtom } from "./MovieCard";

const QuickViewModal = ({ movieId, setIsQuickViewButtonClicked }) => {
  const modalRef = useRef(null);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [movie] = useAtom(selectedMovieAtom);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
        },
      })
      .then((res) => {
        setSelectedMovieDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [movieId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsQuickViewButtonClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsQuickViewButtonClicked]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen inset-0 bg-[#000000c1] z-40 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-[#090E12] overflow-y-auto w-[90%] h-[90%] rounded-xl flex flex-col gap-4 lg:w-[900px]"
      >
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-row gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="flex justify-end">
              <button
                className="text-white z-20 text-3xl transition-all duration-300 hover:text-[#5CA1FF] focus:outline-none absolute top-4 right-4"
                onClick={() => setIsQuickViewButtonClicked(false)}
              >
                <IoClose />
              </button>
            </div>

            <div className="flex flex-col gap-4 lg:gap-0">
              <div className="relative w-full lg:max-h-[35rem] overflow-hidden">
                <img
                  src={`${
                    selectedMovieDetails.backdrop_path
                      ? `https://image.tmdb.org/t/p/original${selectedMovieDetails.backdrop_path}`
                      : "https://healthcostinstitute.org/components/com_easyblog/themes/wireframe/images/placeholder-image.png"
                  }`}
                  className="object-cover w-full h-full rounded-xl"
                  alt={selectedMovieDetails.title}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#090E12] to-transparent"></div>
              </div>

              <div className="flex-1 relative -top-8 flex flex-col gap-4 px-4 lg:px-6 lg:gap-6">
                <div className="flex flex-col gap-2 lg:gap-6">
                  <h1 className="text-2xl lg:text-3xl font-bold text-white">
                    {selectedMovieDetails.title}
                  </h1>

                  {selectedMovieDetails.overview && (
                    <p className="text-white hidden lg:block">
                      {selectedMovieDetails.overview}
                    </p>
                  )}

                  {selectedMovieDetails.tagline && (
                    <p className="text-gray-400 text-sm italic lg:text-base">
                      {selectedMovieDetails.tagline}
                    </p>
                  )}
                </div>

                <div>
                  <button className="px-5 flex items-center gap-1 py-2 bg-[#0166F6] text-white rounded-full transition-all duration-300 hover:bg-[#0167f6bd]">
                    <HiInformationCircle className="text-2xl" />
                    View Details
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {selectedMovieDetails.runtime && (
                    <div className="flex gap-2 items-center">
                      <AiOutlineClockCircle className="text-gray-400 text-xl" />
                      <p className="text-white">
                        Runtime: {selectedMovieDetails.runtime} minutes
                      </p>
                    </div>
                  )}

                  {selectedMovieDetails.budget && (
                    <div className="flex gap-2 items-center">
                      <AiOutlineDollarCircle className="text-gray-400 text-xl" />
                      <p className="text-white">
                        Budget: ${selectedMovieDetails.budget.toLocaleString()}
                      </p>
                    </div>
                  )}

                  {selectedMovieDetails.revenue && (
                    <div className="flex gap-2">
                      <GiCash className="text-gray-400 text-xl" />
                      <p className="text-white">
                        Revenue: $
                        {selectedMovieDetails.revenue.toLocaleString()}
                      </p>
                    </div>
                  )}

                  {selectedMovieDetails.homepage && (
                    <div className="flex gap-2">
                      <FaGlobe className="text-gray-400 text-xl" />

                      <div className="flex items-center gap-1">
                        <p className="text-white">Website:</p>
                        <a
                          href={selectedMovieDetails.homepage}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#5CA1FF] hover:underline"
                        >
                          {selectedMovieDetails.homepage}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-gray-400 text-lg">Genres:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMovieDetails.genres &&
                      selectedMovieDetails.genres.map((genre) => (
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
                  <p className="text-gray-400 text-lg">Production Companies:</p>
                  <div className="flex flex-wrap gap-3">
                    {selectedMovieDetails.production_companies &&
                      selectedMovieDetails.production_companies.map(
                        (company) => (
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
                            <span className="text-white text-sm">
                              {company.name}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickViewModal;
