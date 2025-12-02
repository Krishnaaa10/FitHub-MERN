import { apiSlice } from '../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    googleLogin: builder.mutation({
      query: (data) => ({
        url: '/auth/google',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGoogleLoginMutation } = authApiSlice;
