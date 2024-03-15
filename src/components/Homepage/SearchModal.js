import axios from "axios";
import React, { useEffect } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { useAtom } from "jotai";
import { searchClickedAtom } from "./HeroSection";

const SearchModal = ({
  setSearchResults,
  setLoading,
  searchValue,
  setSearchValue,
  handleSearchChange,
  searchResults,
  loading,
}) => {
  const [searchClicked, setSearchClicked] = useAtom(searchClickedAtom);
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchResults([]);
      setSearchValue("");
      setSearchClicked(false);
      navigate(`/search?q=${searchValue}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1&include_adult=false`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );
        setSearchResults(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };
    if (searchValue !== "") {
      fetchData();
    } else {
      setSearchResults([]);
    }

    return () => {
      setSearchResults([]);
    };
  }, [searchValue, setSearchResults, setLoading]);

  return (
    <div
      className={`w-screen h-screen bg-[#090e12e9] fixed top-0 left-0 z-50 overflow-y-auto transition-all duration-300 ${
        searchClicked
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } ${searchValue !== "" ? "bg-[#090e12]" : "bg-[#090e12e9]"}`}
    >
      <div className="w-full p-4 lg:p-6 h-full">
        <div className="bg-[#090E12] flex items-center gap-2">
          <button
            onClick={() => {
              setSearchClicked(false);
            }}
            className="relative top-1.5 border border-gray-400 rounded-md  transition-all duration-300 hover:border-[#5CA1FF] focus:outline-none"
          >
            <HiChevronLeft className="text-3xl lg:text-4xl text-white transition-all duration-300 hover:text-[#5CA1FF]" />
          </button>

          <div className="w-full h-full flex items-center justify-center">
            <input
              type="text"
              placeholder="Search for movies..."
              className="w-[95%] h-12 lg:h-14 bg-[#090E12] border-b-2 border-[#5CA1FF] text-white text-lg lg:text-xl focus:outline-none"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>

        {loading && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-row gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            </div>
          </div>
        )}

        {searchValue !== "" && !loading && searchResults.length === 0 && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-white text-2xl lg:text-3xl">No results found</p>
          </div>
        )}

        {!loading && searchResults.length > 0 && (
          <div className="flex flex-col gap-6 py-4">
            <h1 className="text-white text-2xl lg:text-3xl mt-4">
              Search Results
            </h1>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 h-full">
              {searchResults.map((movie, index) => (
                <div
                  key={index}
                  className="relative w-full rounded-xl h-80 lg:h-96 cursor-pointer hover:scale-[1.03] transition-all duration-300"
                >
                  <img
                    src={`${
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzrT9jxR16mKUihYwhWzIY29AHvBU3dH4izz2ctjDPUvljnUYQBVv-UQkOrlAhYcpUNlw&usqp=CAU"
                    }`}
                    alt="movie"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-[#090E12] opacity-70"></div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4">
                    <p className="text-white lg:text-lg">{movie.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
