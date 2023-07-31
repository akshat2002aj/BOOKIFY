import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://book-e.onrender.com', credentials: 'include' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Book', 'Order', 'User'],
  endpoints: (builder) => ({}),
});