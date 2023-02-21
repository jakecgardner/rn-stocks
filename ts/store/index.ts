import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { finnHubApi } from '../services/finnhub';
import { watchlistSlice } from './watchlist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [finnHubApi.reducerPath],
};

const rootReducer = combineReducers({
  [finnHubApi.reducerPath]: finnHubApi.reducer,
  watchlist: watchlistSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(finnHubApi.middleware),
});

setupListeners(store.dispatch);
persistStore(store);