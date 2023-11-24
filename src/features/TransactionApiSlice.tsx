import { apiSlice } from './ApiSlice';

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOnefgggfTransaction: builder.query({
      query: (id) => ({
        url: `/api/v1/transaction/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Order'],
    }),
    
    getOneOrder: builder.query({
      query: (id)=>({
        url: `/api/v1/transaction/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: `/api/v1/transaction/payment/process`,
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Payment']
    }),

    createTransaction: builder.mutation({
      query: (data) => ({
        url: `/api/v1/transaction`,
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Order']
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCreateTransactionMutation,
  useGetOneOrderQuery
} = transactionApiSlice;