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
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/api/v1/book/${bookId}`,
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Book', 'User']
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
  useDeleteBookMutation
} = bookApiSlice;