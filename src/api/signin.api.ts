import { baseApi } from '@api/index.api';

export const signInApiSlice = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		signIn: builder.mutation({
			query: (credentials: { email: string; password: string }) => ({
				url: '/login/basic',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		verifyResetPasswordOtp: builder.mutation({
			query: (args: { email: string; otp: string }) => ({
				url: '/credential/verifyOtp',
				method: 'POST',
				body: { ...args },
			}),
		}),
		setNewPassword: builder.mutation({
			query: (args: {
				email: string;
				password: string;
				confirmPassword: string;
				otp: string;
			}) => ({
				url: '/credential/forget/setpassword',
				method: 'PUT',
				body: { ...args },
			}),
		}),
	}),
});

export const {
	useSignInMutation,
	useVerifyResetPasswordOtpMutation,
	useSetNewPasswordMutation,
} = signInApiSlice;
