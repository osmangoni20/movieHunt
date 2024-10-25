import axios from 'axios';
import { MovieResponse } from '../types/MovieType';

const API_KEY = '891e0007e102a4819f37022133321f24'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

export const getSearchingMovie = async (page: number,query:string): Promise<MovieResponse> => {
  console.log(query)
    const response = await axios.get<MovieResponse>(`${BASE_URL}?query=${query}&api_key=${API_KEY}`);
  return response.data;
};