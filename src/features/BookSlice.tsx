import { apiSlice } from './ApiSlice';

export const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (data) => ({
        url: `/api/v1/book`,
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['Book']
    }),
    getBooksWithInRadius: builder.query({
      query: () => ({
        url: `/api/v1/book/radius/5`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    getBookById: builder.query({
      query: (id) => ({
        url: `/api/v1/book/${id}`,
        method: 'GET',
      }),
      providesTags: ['Book'],
      keepUnusedDataFor: 5,
    }),
    getMyBooks: builder.query({
      query: (id) => ({
        url: `/api/v1/book/my`,
        method: 'GET',
      }),
      providesTags: ['Book'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetBookByIdQuery,
  useGetMyBooksQuery,
  useGetBooksWithInRadiusQuery,
} = bookApiSlice;