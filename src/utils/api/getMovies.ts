


import axios from 'axios';
import { MovieResponse } from '../types/MovieType';

const API_KEY = '891e0007e102a4819f37022133321f24'; // Replace with your TMDB API key

export const getMovies = async (page: number,searchTerm:string): Promise<MovieResponse> => {
  const apiUrl = searchTerm
  ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${page}`
  : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;

  const response = await axios.get<MovieResponse>(apiUrl);
  return response.data;
};