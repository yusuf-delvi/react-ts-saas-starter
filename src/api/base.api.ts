import {
	createApi,
	fetchBaseQuery,
	BaseQueryFn,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../features/authentication/authSlice';

interface QueryArgs {
	url: string;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	body?: unknown;
}

interface RefreshResponse {
	accessToken: string;
	refreshToken: string;
}

import type { RootState } from '@/store/store';

const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
const xApiKey = import.meta.env.VITE_X_API_KEY as string;

const rawBaseQuery = fetchBaseQuery({
	baseUrl,
	prepareHeaders: (headers, { getState }) => {
		const { token } = (getState() as RootState).auth;
		headers.set('x-api-key', xApiKey);
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
			headers.set('content-type', 'application/json');
		}
		return headers;
	},
});

const baseQueryWithReauth: BaseQueryFn<
	QueryArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await rawBaseQuery(args, api, extraOptions);

	if (result.error?.status === 401) {
		const errorData = result.error.data as { statusCode?: number };

		if (errorData?.statusCode === 10003) {
			const { refreshToken, user } = (api.getState() as RootState).auth;
			const refreshResult = await rawBaseQuery(
				{
					url: '/token/refresh',
					method: 'POST',
					body: JSON.stringify({ refreshToken }),
				},
				api,
				extraOptions
			);

			if (!refreshResult.error && refreshResult.data) {
				const refreshedData = refreshResult.data as RefreshResponse;

				api.dispatch(setCredentials({ ...refreshedData, user }));

				result = await rawBaseQuery(args, api, extraOptions);
			} else {
				api.dispatch(logOut());
			}
		}

		if (errorData?.statusCode === 10004) {
			api.dispatch(logOut());
		}
	}

	return result;
};

// --- RTK Query API slice ---
export const baseApi = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
});
