"use client";


import { configureStore } from '@reduxjs/toolkit'
// ...
import watchlistReducer from '@/redux/feature/WatchList'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/"

const persistConfig={
    key:'root',
    storage
  }
const persistWatchlistReducer=persistReducer(persistConfig,watchlistReducer)
export const store = configureStore({
  reducer: {
    watchListR:persistWatchlistReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
})

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

