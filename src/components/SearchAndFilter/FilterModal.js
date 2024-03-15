import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterModal = ({ onClose }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showMoreLanguages, setShowMoreLanguages] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    const fetchLanguages = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/configuration/languages",
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            },
          }
        );
        setLanguages(response.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchGenres();
    fetchLanguages();
  }, []);

  const toggleGenre = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const toggleLanguage = (langIso) => {
    if (selectedLanguages.includes(langIso)) {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== langIso)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, langIso]);
    }
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedLanguages([]);
  };

  const applyFilters = () => {
    // Construct query params based on selected filters
    const queryParams = {
      genres: selectedGenres.join(","),
      languages: selectedLanguages.join(","),
    };

    // Convert queryParams object to query string
    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join("&");

    navigate(`/filter?${queryString}`);

    onClose();
  };

  const visibleLanguages = showMoreLanguages
    ? languages
    : languages.slice(0, 60);

  return (
    <div className="fixed inset-0 bg-gray-900 overflow-y-auto bg-opacity-95 z-50 p-4 lg:p-6">
      <div className="rounded-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Filters</h2>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold text-center">Genres</h1>

          <div className="flex flex-wrap">
            {genres.map((genre) => (
              <div
                key={genre.id}
                className={`cursor-pointer rounded-full py-2 px-5 mr-3 mb-4 ${
                  selectedGenres.includes(genre.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => toggleGenre(genre.id)}
              >
                {genre.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <h1 className="text-xl font-semibold text-center">Languages</h1>

          <div className="flex flex-wrap">
            {visibleLanguages.map((lang) => (
              <div
                key={lang.iso_639_1}
                className={`cursor-pointer rounded-full py-2 px-5 mr-3 mb-4 ${
                  selectedLanguages.includes(lang.iso_639_1)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => toggleLanguage(lang.iso_639_1)}
              >
                {lang.english_name}
              </div>
            ))}
            {!showMoreLanguages && languages.length > 5 && (
              <div
                className="cursor-pointer rounded-full py-2 px-5 mr-3 mb-4 text-gray-300 border border-gray-500 transition-all duration-300 hover:bg-blue-500 hover:text-white"
                onClick={() => setShowMoreLanguages(true)}
              >
                Show More
              </div>
            )}
            {showMoreLanguages && (
              <div
                className="cursor-pointer rounded-full py-2 px-5 mr-3 mb-4 text-gray-300 border border-gray-500 transition-all duration-300 hover:bg-blue-500 hover:text-white"
                onClick={() => setShowMoreLanguages(false)}
              >
                Show Less
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={clearFilters}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-full mr-4 transition-all duration-300 hover:bg-gray-400"
          >
            Clear Filters
          </button>
          <button
            onClick={applyFilters}
            className="bg-blue-800 text-white py-2 px-4 rounded-full transition-all duration-300 hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
