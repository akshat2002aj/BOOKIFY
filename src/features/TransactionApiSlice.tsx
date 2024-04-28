import { apiSlice } from './ApiSlice';

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOneOrder: builder.query({
      query: (id)=>({
        url: `/api/v1/transaction/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Payment']
    }),

    getMyOrder: builder.query({
      query: ()=>({
        url: `/api/v1/transaction/allOrder`,
        method: 'GET'
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Order']
    }),
    getLandedOrder: builder.query({
      query: ()=>({
        url: `/api/v1/book/landed`,
        method: 'GET'
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Landed']
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
    verifyDeliveryOtp: builder.mutation({
      query: data => ({
        url: `/api/v1/book/deliver/${data.id}`,
        method: 'POST',
        body: data.data,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Payment'],
    }),
    verifyReturnOtp: builder.mutation({
      query: data => ({
        url: `/api/v1/book/return/${data.id}`,
        method: 'POST',
        body: data.data,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Payment'],
    })
  }),
});

export const {
  useCreateOrderMutation,
  useCreateTransactionMutation,
  useGetOneOrderQuery,
  useGetMyOrderQuery,
  useGetLandedOrderQuery,
  useVerifyDeliveryOtpMutation,
  useVerifyReturnOtpMutation
} = transactionApiSlice;