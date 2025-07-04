import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage

import urlDataReducer from './slices/urlDataSlice';
import urlStatsReducer from './slices/urlStatsSlice'
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  user:userReducer,
  urlData:urlDataReducer,
  urlStats:urlStatsReducer
});

const persistConfig = {
  key: 'root',       // key in localStorage
  storage,           // use localStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);