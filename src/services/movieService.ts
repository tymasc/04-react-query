import axios from 'axios';
import { MovieSearchResponse } from '../types/service';

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const API_URL = 'https://api.themoviedb.org/3/search/movie';

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
