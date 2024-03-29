import { useAtom } from "jotai";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SearchModal from "./components/Homepage/SearchModal";
import {
  isQuickViewButtonClickedAtom,
  selectedMovieAtom,
} from "./components/common/MovieCard";
import QuickViewModal from "./components/common/QuickViewModal";
import FilterResultsPage from "./pages/FilterResultsPage";
import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import SearchResultsPage from "./pages/SearchResultsPage";

export const apiKey = process.env.REACT_APP_TMDB_API_KEY;

export default function App() {
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isQuickViewButtonClicked, setIsQuickViewButtonClicked] = useAtom(
    isQuickViewButtonClickedAtom
  );
  const [movie] = useAtom(selectedMovieAtom);

  const handleBackClick = () => {
    setSearchClicked(false);
    setSearchValue("");

    setSearchResults([]);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/filter" element={<FilterResultsPage />} />
        </Routes>

        <SearchModal
          setSearchResults={setSearchResults}
          setLoading={setLoading}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchClicked={searchClicked}
          handleBackClick={handleBackClick}
          handleSearchChange={handleSearchChange}
          searchResults={searchResults}
          loading={loading}
        />

        {isQuickViewButtonClicked && (
          <QuickViewModal
            movieId={movie.id}
            setIsQuickViewButtonClicked={setIsQuickViewButtonClicked}
          />
        )}
      </Router>
    </div>
  );
}
