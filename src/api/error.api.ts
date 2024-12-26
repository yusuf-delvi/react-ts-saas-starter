import { baseApi } from './base.api';

interface Error {
	error: object;
}

export const errorApiSlice = baseApi.injectEndpoints({
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