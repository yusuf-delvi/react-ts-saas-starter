import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/api/auth.types';

interface AuthState {
	user: User | null;
	token: string | null;
	refreshToken: string | null;
	isSubscribed: boolean;
	customerId: string;
	isSubscriptionActive: boolean;
	subscription: string;
}

const initialState: AuthState = {
	user: null,
	token: null,
	refreshToken: null,
	isSubscribed: false,
	customerId: '',
	isSubscriptionActive: false,
	subscription: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			const { user, accessToken, refreshToken } = action.payload;
			state.user = user;
			state.token = accessToken;
			state.refreshToken = refreshToken;
		},
		setUpdateIsGuideCompleted: (state, action) => {
			if (state.user) {
				state.user.isGuideCompleted = action.payload;
			}
		},
		logOut: (state) => {
			state.user = null;
			state.token = null;
			state.refreshToken = null;
		},
		setSubscribed: (state, action) => {
			state.isSubscribed = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				(action) => {
					return action.type.endsWith('api/executeMutation/fulfilled');
				},
				(state, action) => {
					const endpointName = action.meta.arg.endpointName;
					if (endpointName === 'signIn') {
						state.user = action.payload.data.userData;
						state.token = action.payload.data.tokens.accessToken;
						state.refreshToken = action.payload.data.tokens.refreshToken;
						state.isSubscribed = action.payload.data.userData.isSubscribed;
						state.customerId = action.payload.data.userData.customerId;
						state.isSubscriptionActive =
							action.payload.data.userData.isSubscriptionActive;
						state.subscription = action.payload.data.userData.subscription;
					} else if (endpointName === 'googleLogIn') {
						state.user = action.payload.data.userData;
						state.token = action.payload.data.tokens.accessToken;
						state.refreshToken = action.payload.data.tokens.refreshToken;
						state.isSubscribed = action.payload.data.userData.isSubscribed;
						state.customerId = action.payload.data.userData.customerId;
						state.isSubscriptionActive =
							action.payload.data.userData.isSubscriptionActive;
						state.subscription = action.payload.data.userData.subscription;
					} else if (endpointName === 'verifyOtp') {
						state.user = action.payload.data.userData;
						state.token = action.payload.data.tokens.accessToken;
						state.refreshToken = action.payload.data.tokens.refreshToken;
						state.isSubscribed = action.payload.data.userData.isSubscribed;
						state.customerId = action.payload.data.userData.customerId;
						state.isSubscriptionActive =
							action.payload.data.userData.isSubscriptionActive;
						state.subscription = action.payload.data.userData.subscription;
					}
				}
			)
			.addMatcher(
				(action) => {
					return action.type.endsWith('api/executeQuery/fulfilled');
				},
				(state, action) => {
					const endpointName = action.meta.arg.endpointName;
					if (endpointName === 'profile') {
						state.user = action.payload.data;
					}
				}
			);
	},
});

export const {
	setCredentials,
	logOut,
	setUpdateIsGuideCompleted,
	setSubscribed,
} = authSlice.actions;

// selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectAuthType = (state: { auth: AuthState }) =>
	state.auth.user?.authType;

export default authSlice.reducer;
