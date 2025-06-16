import { configureStore } from "@reduxjs/toolkit";
import urlDataReducer from './slices/urlDataSlice';
import urlStatsReducer from './slices/urlStatsSlice'
import userReducer from './slices/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage
import { combineReducers } from 'redux';

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

export const persistor = persistStore(store);