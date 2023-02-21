import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { WatchlistItemData } from '../components/Watchlist/Watchlist';
import { type RootState } from './index';

export type WatchlistState = Array<WatchlistItemData>;
const initialState: WatchlistState = [
  { symbol: 'AAPL', companyName: 'Apple Inc.' },
  { symbol: 'AMZN', companyName: 'Amazon Inc.' },
  { symbol: 'GOOG', companyName: 'Alphabet' },
  { symbol: 'MSFT', companyName: 'Microsoft Corporation' },
];

const sortList = (a: WatchlistItemData, b: WatchlistItemData) => a.symbol < b.symbol ? -1 : 1;

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<WatchlistItemData>) {
      state.push(action.payload);
      state.sort(sortList);
      return state;
    },
    deleteItem(state, action: PayloadAction<string>) {
      const newState = state.filter(item => item.symbol !== action.payload);
      newState.sort(sortList);
      return newState;
    },
  },
});

export const selectWatchlist = createSelector(
  (state: RootState) => state.watchlist,
  (watchlist: WatchlistState) => watchlist,
);

export const selectItemInList = (symbol: string) => createSelector(
  (state: RootState) => state.watchlist,
  (watchlist: WatchlistState) => watchlist.filter(item => item.symbol === symbol).length === 1,
);