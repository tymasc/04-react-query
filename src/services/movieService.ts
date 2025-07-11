import axios from 'axios';
import { Movie } from '../types/movie';
import { MovieSearchResponse } from '../types/service';

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const API_URL = 'https://api.themoviedb.org/3/search/movie';

export async function fetchMovies(query: string): Promise<Movie[]> {
  const config = {
    params: { query },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      Accept: "application/json",
    }
  };

  const response = await axios.get<MovieSearchResponse>(API_URL, config);
  return response.data.results;
}
