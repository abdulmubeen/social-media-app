import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PAUSE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  FLUSH,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./slices/authSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistedStore = persistStore(store);
export default store;
