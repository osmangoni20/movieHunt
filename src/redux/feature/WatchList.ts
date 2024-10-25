"use client";

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
        addToWatchlist:(state:TInitialState,action:PayloadAction<TMovie>)=>{
            state.movies.push(action.payload)
        },
        removeFromWatchlist:(state:TInitialState,action:PayloadAction<number>)=>{
            state.movies=state.movies.filter(movie=>movie.id!==action.payload)
        }
    }
})

export const {addToWatchlist,removeFromWatchlist}=WatchlistSlice.actions

export default WatchlistSlice.reducer