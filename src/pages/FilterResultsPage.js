import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { IoFilter } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import FilterModal from "../components/SearchAndFilter/FilterModal";
import Header from "../components/common/Header";
import MovieCard from "../components/common/MovieCard";

const FilterResultsPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");
  const genres = queryParams.get("genres");
  const languages = queryParams.get("languages");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        let apiUrl = `https://api.themoviedb.org/3/discover/movie`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
          },
          params: {
            query: searchQuery,
            sort_by: sortBy,
            with_genres: genres,
            with_original_language: languages,
          },
        });
        setSearchResults(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, sortBy, genres, languages]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const sortOptions = {
    "Popularity (Ascending)": "popularity.asc",
    "Popularity (Descending)": "popularity.desc",
    "Release Date (Ascending)": "release_date.asc",
    "Release Date (Descending)": "release_date.desc",
    "Rating (Ascending)": "vote_average.asc",
    "Rating (Descending)": "vote_average.desc",
  };

  const sortSearchResults = (results) => {
    return results.sort((a, b) => {
      const [sortByKey, sortOrder] = sortBy.split(".");
      const valueA = a[sortByKey];
      const valueB = b[sortByKey];

      if (sortOrder === "asc") {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto">
        <Header />
        <div className="px-4 lg:px-6 pb-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between mb-4">
            <div className="flex items-center">
              <button
                onClick={toggleFilterModal}
                className="flex items-center gap-1.5 px-4 py-2 bg-gray-800 rounded-full text-white mr-4"
              >
                <IoFilter className="text-xl" />
                Filter
              </button>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Sort by:</span>
              <div className="relative">
                <select
                  className="px-3 py-2 bg-gray-800 rounded-md text-white focus:outline-none appearance-none pr-8"
                  onChange={handleSortChange}
                  value={sortBy}
                >
                  {Object.entries(sortOptions).map(([label, value]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <HiChevronDown className="text-white text-2xl" />
                </div>
              </div>
            </div>
          </div>
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
            <p className="text-center">No results found </p>
          )}
          {!loading && searchResults.length > 0 && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Filtered Results</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-10">
                {sortSearchResults(searchResults).map((movie) => (
                  <MovieCard key={movie.id} movie={movie} type={"search"} />
                ))}
              </div>
            </div>
          )}
          {/* Render filter modal */}
          {showFilterModal && <FilterModal onClose={toggleFilterModal} />}
        </div>
      </div>
    </div>
  );
};

export default FilterResultsPage;
