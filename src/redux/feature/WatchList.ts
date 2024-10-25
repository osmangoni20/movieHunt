import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TMovie } from '@/utils/types/MovieType'


type TInitialState={
    movies:TMovie[]
}

const initialState:TInitialState={
    movies:[]
}


export const WatchlistSlice=createSlice({
    name:"watchlist",
    initialState,
    reducers:{
        addMovieInWatchList:(state,action:PayloadAction<TMovie>)=>{
            state.movies.push(action.payload)
        },
        deleteMovieFromWatchlist:(state,action:PayloadAction<number>)=>{
            state.movies=state.movies.filter(movie=>movie.id!==action.payload)
        }
    }
})

export const {addMovieInWatchList,deleteMovieFromWatchlist}=WatchlistSlice.actions

export default WatchlistSlice.reducer