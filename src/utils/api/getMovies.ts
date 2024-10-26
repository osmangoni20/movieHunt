


import axios from 'axios';
import { SearchMoviesResponse, searchMoviesResponseSchema } from '../schema/schema';

const API_KEY = '891e0007e102a4819f37022133321f24'; 
export const getMovies = async (page: number,searchTerm:string): Promise<SearchMoviesResponse> => {
  const apiUrl = searchTerm
  ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${page}`
  : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;

  const response = await axios.get<SearchMoviesResponse>(apiUrl);
  const validationResult = searchMoviesResponseSchema.safeParse(response.data);

  if (!validationResult.success) {
    console.error('Validation Error:', validationResult.error);
    throw new Error('Invalid API response structure');
  }

  // Return the validated data
  return validationResult.data;
};