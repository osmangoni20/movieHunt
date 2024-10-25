"use client";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "@/redux/feature/WatchList";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TMovie } from "../types/MovieType";

const WatchListButton = ({ movie }: { movie: TMovie }) => {
  const { movies } = useAppSelector((state) => state.watchListR);
  console.log(movies)
  const dispatch = useAppDispatch();
  const isExist = movies?.filter((singleMovie) => (singleMovie.id === movie.id));

  const HandleWatchList = () => {
    if (isExist.length>0) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };
  return (
    <div className="w-[200px]">
      <button
        className={`px-4 py-2 rounded-lg text-white ${
          isExist?.length>0 ? "bg-red-600 " : "bg-[#262F40]"
        }`}
        onClick={HandleWatchList}
      >
        {isExist?.length>0 ? "Remove WatchList" : "Add to Watchlist"}
      </button>
    </div>
  );
};

export default WatchListButton;
