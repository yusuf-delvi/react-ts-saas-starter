import { baseApi } from './base.api';

export const settingsApiSlice = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getProfileDetail: builder.query({
			query: () => ({
				url: `/profile/my`,
			}),
		}),
		updateAccount: builder.mutation({
			query: (accountData) => ({
				url: `/profile`,
				method: 'PUT',
				body: { ...accountData },
			}),
		}),
		updatePassword: builder.mutation({
			query: (passwords) => ({
				url: `/profile/updatepassword`,
				method: 'POST',
				body: { ...passwords },
			}),
		}),
	}),
});

export const {
	useGetProfileDetailQuery,
	useUpdateAccountMutation,
	useUpdatePasswordMutation,
} = settingsApiSlice;
