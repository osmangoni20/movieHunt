import { configureStore } from '@reduxjs/toolkit'
// ...
import cartReducer from '../redux/feature/CartSlice'
import orderReducer from '../redux/feature/OrderSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/"

const persistConfig={
    key:'root',
    storage
  }
const persistCartReducer=persistReducer(persistConfig,cartReducer)
const persistOrderReducer=persistReducer(persistConfig,orderReducer)
export const store = configureStore({
  reducer: {
    cartR:persistCartReducer,
    orderR:persistOrderReducer
  },
})

export const persistor = persistStore(store);
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

