import { apiSlice } from './ApiSlice';
type props = {
  id:String,
  data: {
    message: String
  }
}
export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (data) => ({
        url: `/api/v1/chat`,
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Chat']
    }),
    sendMessage: builder.mutation({
      query: ({id , message}) => ({
        url: `/api/v1/chat/${id}`,
        method: 'POST',
        body: message,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Chat']
    }),
    getAllMessage: builder.query({
      query: (id) => ({
        url: `/api/v1/chat/${id}`,
        method: 'GET',
      }),
      providesTags: ['Chat'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
    useCreateChatMutation,
    useGetAllMessageQuery,
    useSendMessageMutation
} = chatApiSlice;