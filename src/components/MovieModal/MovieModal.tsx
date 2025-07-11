import css from "./MovieModal.module.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Movie } from "../../types/movie";

interface MovieModalProps {
  movie: Movie,
  onClose: () => void
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    }
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} data-backdrop role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose} aria-label="Close modal">&times;</button>
        <img className={css.image} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}/10</p>
        </div>
      </div>
    </div>,
    document.body
  );
}