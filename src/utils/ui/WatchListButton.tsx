"use client";
import {
  addMovieInWatchList,
  deleteMovieFromWatchlist,
} from "@/redux/feature/WatchList";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { TMovie } from "../types/MovieType";

const WatchListButton = ({ movie }: { movie: TMovie }) => {
  const [isWatchListMovie, setIsWatchListMovie] = useState(false);
  const { movies } = useAppSelector((state) => state.watchListR);
  const isExist = movies.filter((singleMovie) => (singleMovie.id = movie.id));

  if (isExist) {
    setIsWatchListMovie(true);
  }
  const HandleWatchList = () => {
    if (isWatchListMovie) {
      deleteMovieFromWatchlist(movie.id);
    } else {
      addMovieInWatchList(movie);
    }
  };
  return (
    <div>
      <button
        className={`px-4 py-2 rounded-lg text-white ${
          isWatchListMovie ? "bg-[#262F40]" : "bg-red-600"
        }`}
        onClick={HandleWatchList}
      >
        {" "}
        {isWatchListMovie ? "Remove WatchList" : "Add to Watchlist"}
      </button>
    </div>
  );
};

export default WatchListButton;
