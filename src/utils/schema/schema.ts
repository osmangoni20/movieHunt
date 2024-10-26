import { z } from 'zod';

// Define the Zod schema for a single movie result
const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),  // Can be null if no backdrop
  genre_ids: z.array(z.number()),  // Array of genre IDs
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),  // Can be null if no poster
  release_date: z.string().nullable(),  // Can be null if no release date
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

// Define the Zod schema for the full API response
export const searchMoviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),  // Array of movies
  total_pages: z.number(),
  total_results: z.number(),
});

// Infer the TypeScript type from the Zod schema
export type SearchMoviesResponse = z.infer<typeof searchMoviesResponseSchema>;
