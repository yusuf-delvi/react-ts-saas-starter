import { baseApi } from './index.api';

export const signUpApiSlice = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		signUp: builder.mutation({
			query: (credentials: {
				name: string;
				email: string;
				password: string;
			}) => ({
				url: '/signup',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		googleLogIn: builder.mutation({
			query: (credentials: { token: string }) => ({
				url: '/signup/google',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		verifyOtp: builder.mutation({
			query: (args: { email: string; otp: string }) => ({
				url: 'signup/verifymail',
				method: 'POST',
				body: { ...args },
			}),
		}),
		resendOtp: builder.mutation({
			query: (args: { email: string }) => ({
				url: '/credential/forget',
				method: 'POST',
				body: { ...args },
			}),
		}),
	}),
});

export const {
	useSignUpMutation,
	useGoogleLogInMutation,
	useVerifyOtpMutation,
	useResendOtpMutation,
} = signUpApiSlice;
