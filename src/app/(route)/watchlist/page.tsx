"use client";

import { useAppSelector } from "@/redux/hooks";

import WatchListButton from "@/utils/ui/WatchListButton";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
 const { movies } = useAppSelector((state) => state.watchListR);

console.log(movies)
  return (
    <div className="max-w-[1200px] mx-auto p-5">
      <h1 className="text-3xl py-4 font-semibold font-sans">
        WatchList Movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {movies?.map((movie) => (
          <div key={movie?.id} className="cursor-pointer p-2 rounded-b-md dark:bg-white dark:text-gray-800">
            <Link href={`/movies/${movie?.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
                alt={movie?.title || ""}
                width={200}
                height={300}
                className="w-full"
                loading="lazy"
              />
              <h3>{movie?.title.slice(0,20)}</h3>
              <p>
                <span className="font-semibold">Release Date: </span>
                {movie?.release_date}
              </p>
              <p>
                <span className="font-semibold">Rating:</span>{" "}
                {movie?.vote_average}
              </p>
            </Link>
            <div className="flex justify-center w-full my-3">
                <WatchListButton movie={movie}></WatchListButton>
            </div>
          </div>
        ))}
      </div>
      {
        movies?.length==0&&<div className="flex justify-center">
            <p className="text-center text-sm py-2">Not Found Watchlist Movies.</p>
        </div>
      }
    </div>
  );
};

export default Page;
