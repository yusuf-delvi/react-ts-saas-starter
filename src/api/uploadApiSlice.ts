import { apiSlice } from './apiSlice';

interface QueryParams {
  type?: string;
  extension?: string;
}

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.query({
      query: ({ extension }: QueryParams) => ({
        url: `/general/file/presignedurl?extension=${extension}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useUploadQuery } = uploadApiSlice;
