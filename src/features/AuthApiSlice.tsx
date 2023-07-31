import {apiSlice} from './ApiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `/api/v1/auth/login`,
        method: 'POST',
        body: data,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation({
      query: data => ({
        url: `/api/v1/auth/register`,
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/api/v1/auth/logout`,
        method: 'GET',
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: `/api/v1/auth/me`,
        method: 'GET',
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    updateProfile: builder.mutation({
      query: data => ({
        url: `/api/v1/user/${data.id}`,
        method: 'PUT',
        body: data.data,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useProfileQuery,
} = userApiSlice;
