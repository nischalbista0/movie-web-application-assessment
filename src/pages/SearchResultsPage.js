import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import MovieCard from "../components/common/MovieCard";

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=1&include_adult=false`,
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

    if (searchQuery) {
      fetchSearchResults();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto ">
        <Header />

        <div className="px-4 lg:px-6 pb-10">
          {loading && (
            <div className="w-full min-h-[85vh] h-full flex items-center justify-center">
              <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
              </div>
            </div>
          )}
          {!loading && searchResults.length === 0 && (
            <p>No results found for "{searchQuery}"</p>
          )}
          {!loading && searchResults.length > 0 && (
            <div>
              <h1 className="text-2xl font-bold mb-4">
                Search Results for{" "}
                <span className="text-[#e2cd59]">"{searchQuery}"</span>
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-6">
                {searchResults.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} type={"search"} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;