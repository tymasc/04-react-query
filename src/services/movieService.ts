import axios from 'axios';
import { Movie } from '../types/movie';

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const API_URL = 'https://api.themoviedb.org/3/search/movie';

interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieSearchResponse> => {
  const { data } = await axios.get<MovieSearchResponse>(API_URL, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      accept: 'application/json',
    },
  });

  return data;
};
