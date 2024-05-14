import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://book-e.onrender.com', credentials: 'include' });
// https://book-e.onrender.com
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Book', 'Order', 'User', 'Payment', 'Landed', 'Chat'],
  endpoints: (builder) => ({}),
});