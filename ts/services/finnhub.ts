import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiToken = '<api key>';

export const finnHubApi = createApi({
  reducerPath: 'finnHubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://finnhub.io/api/v1/' }),
  endpoints: (builder) => ({
    getTopStories: builder.query({
      query: () => `news?category=general&token=${apiToken}`,
    }),
    getCompanyNews: builder.query({
      query: ({ symbol, fromDate, toDate }) => `company-news?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=${apiToken}`,
    }),
    getCandlesticks: builder.query({
      query: ({ symbol, fromDate, toDate }) => `stock/candle?symbol=${symbol}&resolution=1&from=${fromDate}&to=${toDate}&token=${apiToken}`,
    }),
    getMetrics: builder.query({
      query: (symbol) => `stock/metric?symbol=${symbol}&metric=all&token=${apiToken}`,
    }),
    search: builder.query({
      query: (searchText) => `search?q=${searchText}&token=${apiToken}`,
    }),
  }),
});

export const { useGetTopStoriesQuery } = finnHubApi;
export const { useGetCompanyNewsQuery } = finnHubApi;
export const { useGetCandlesticksQuery } = finnHubApi;
export const { useGetMetricsQuery } = finnHubApi;
export const { useSearchQuery } = finnHubApi;