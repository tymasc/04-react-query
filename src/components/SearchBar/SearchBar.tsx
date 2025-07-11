import styles from "./SearchBar.module.css";
import { useTransition } from "react";
import toast from "react-hot-toast";

interface Props {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: Props) {
  const [isPending, startTransition] = useTransition();

  const action = (formData: FormData) => {
    const value = (formData.get('query') as string)?.trim();

    if (!value) {
      toast.error("Please enter your search query.");
      return;
    }

    startTransition(() => {
      onSubmit(value);
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={action}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit" disabled={isPending}>
            {isPending ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
    </header>
  );
}
