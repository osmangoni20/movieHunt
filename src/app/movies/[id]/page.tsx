/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TCastMember,
  TGenre,
  TRecommendedMovie,
} from "@/utils/types/MovieType";
import WatchListButton from "@/utils/ui/WatchListButton";
import Image from "next/image";
import Link from "next/link";

const API_KEY = "891e0007e102a4819f37022133321f24";
const movie_details_endPoint = (id: string) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
const movie_credits_endPoint = (id: string) =>
  `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
const movie_recommendation_endPoint = (id: string) =>
  `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`;

export const getMovieData = async (id: string) => {
  // Fetch movie details, credits, and recommendations
  const [movieDetailsRes, movieCreditsRes, movieRecommendationsRes] =
    await Promise.all([
      fetch(movie_details_endPoint(id)),
      fetch(movie_credits_endPoint(id)),
      fetch(movie_recommendation_endPoint(id), { next: { revalidate: 60 } }),
    ]);
  const movieDetails = await movieDetailsRes.json();
  const movieCredits = await movieCreditsRes.json();
  const movieRecommendations = await movieRecommendationsRes.json();

  if (!movieDetails) {
    return { notFound: true };
  }

  return { movieDetails, movieCredits, movieRecommendations };
};

export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const { movieDetails, movieCredits, movieRecommendations }:any = getMovieData(id);

  return (
    <div className="mx-auto my-16 max-w-[1200px]">
      <div className="md:grid grid-cols-2 justify-between gap-10">
        {/* Movie Poster */}
        <Image
          src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
          alt={movieDetails?.title || ""}
          width={800}
          height={400}
        />
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold font-serif">
              {movieDetails.title}
            </h1>
           
            <WatchListButton movie={movieDetails} />
           
          </div>
          <p className="font-thin py-2 text-justify">{movieDetails.overview}</p>
          <h3 className="text-xl font-sans font-semibold">
            Release Date: {movieDetails.release_date}
          </h3>

          {/* Genres */}
          <div>
            <h3 className="text-xl font-sans font-semibold">Genres:</h3>
            <ul>
              {movieDetails?.genres?.map((genre: TGenre) => (
                <li className="font-thin p-2" key={genre.id}>
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Cast */}
          <div>
            <h3 className="text-xl font-sans font-semibold">Cast:</h3>
            <ul>
              {movieCredits?.cast
                ?.slice(0, 12)
                .map((actor: TCastMember, index: number) => (
                  <li className="font-thin border-b-2  p-2" key={actor.cast_id}>
                    {index + 1}: {actor.name} as {actor.character}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-3xl font-sans font-semibold my-10">
          Recommended Movies
          <span className="text-sm text-gray-300 px-4">Only for you</span>
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {movieRecommendations?.results?.map((movie: TRecommendedMovie) => (
            <li key={movie?.id} className="cursor-pointer">
              <Link href={`/movies/${movie?.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
                  alt={movie?.title || ""}
                  width={200}
                  height={300}
                  loading="lazy"
                />
                <h3>{movie?.title}</h3>
                <p>
                  <span className="font-semibold">Release Date: </span>
                  {movie?.release_date}
                </p>
                <p>
                  <span className="font-semibold">Rating:</span>{" "}
                  {movie?.vote_average}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export async function generateStaticParams() {
  // Pre-build paths if needed
  return [];
}
