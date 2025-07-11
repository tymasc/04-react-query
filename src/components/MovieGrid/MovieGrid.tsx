import css from "./MovieGrid.module.css";
import { Movie } from "../../types/movie";

interface Props {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: Props) {
  return (
    <ul className={css.grid}>
    {movies.map(movie => (
      <li key={movie.id}>
        <div className={css.card} onClick={() => onSelect(movie)}>
          <img
            className={css.image}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
          <h2 className={css.title}>{movie.title}</h2>
        </div>
      </li>
    ))}
  </ul>
);
}