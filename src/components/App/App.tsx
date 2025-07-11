import { useState } from "react";
import css from "./App.module.css"
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";


export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = async (query: string) => {
        setLoading(true);
        setError(false);
        setMovies([]);

        try {
            const results = await fetchMovies(query);
            if (results.length === 0) {
                toast.error("No movies found for your request.");
                return;
            }
            setMovies(results);
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => setSelectedMovie(null);
    
    return (
        <div className={css.app}>
          <SearchBar onSubmit={handleSearch} />
          <Toaster position="top-center" />
          {loading && <Loader />}
          {error && <ErrorMessage />}
          {!loading && !error && movies.length > 0 && (
            <MovieGrid movies={movies} onSelect={setSelectedMovie} />
          )}
          {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
        </div>
      );
}