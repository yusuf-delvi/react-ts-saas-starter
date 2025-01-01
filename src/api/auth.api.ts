import { baseApi } from '@api/index.api';

export const authApiSlice = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/login/basic',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
	}),
});

export const { useLoginMutation } = authApiSlice;
