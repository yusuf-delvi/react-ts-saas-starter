import {
	configureStore,
	getDefaultMiddleware,
	combineReducers,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import authReducer from '../features/authentication/authSlice';
import { apiSlice } from '../api/apiSlice';
import signUpFormReducer from '../features/SignUp/signUpFormSlice';
import signInFormReducer from '../features/SignIn/signInFormSlice';
import setPasswordFormReducer from '../features/SignIn/setPasswordFormSlice';
import accountFormReducer from '@/features/settings/accountFormSlice';
import settingsSliceReducer from '@/features/settings/settingsSlice';
import errorReducer from '../features/error/errorSlice';
import { errorMiddleware } from './errorMiddleware';

// Redux persist config
const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: [
		'auth',
		'signUpForm',
		'signInForm',
		'setPasswordForm',
		'accountForm',
	],
};

// Combined root reducer
const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	auth: authReducer,
	signUpForm: signUpFormReducer,
	signInForm: signInFormReducer,
	setPasswordForm: setPasswordFormReducer,
	accountForm: accountFormReducer,
	settings: settingsSliceReducer,
	error: errorReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Customized middleware
const customizedMiddleware = getDefaultMiddleware({
	serializableCheck: {
		ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
	},
});

export const store = configureStore({
	reducer: persistedReducer,
	middleware: customizedMiddleware.concat(apiSlice.middleware, errorMiddleware),
	devTools: true,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
