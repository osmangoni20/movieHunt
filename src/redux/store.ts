import { configureStore } from '@reduxjs/toolkit'
// ...
import watchListReducer from './feature/WatchList'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/"

const persistConfig={
    key:'root',
    storage
  }
const persistCartReducer=persistReducer(persistConfig,watchListReducer)
export const store = configureStore({
  reducer: {
    watchListR:persistCartReducer,
  },
})

export const persistor = persistStore(store);
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

