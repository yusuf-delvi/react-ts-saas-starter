import { apiSlice } from './apiSlice';

interface Error {
  error: Object;
}

export const errorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendError: builder.mutation({
      query: (error: Error) => ({
        url: '/error',
        method: 'POST',
        body: error,
      }),
    }),
  }),
});

export const { useSendErrorMutation } = errorApiSlice;
