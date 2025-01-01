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
import authReducer from './slices/authSlice';
import { baseApi } from '@api/index.api';
import signUpFormReducer from './slices/signupSlice';
import signInFormReducer from './slices/signInFormSlice';
import setPasswordFormReducer from './slices/setPasswordFormSlice';
import accountFormReducer from './slices/accountFormSlice';
import settingsSliceReducer from './slices/settingsSlice';
import errorReducer from './slices/errorSlice';
import { errorMiddleware } from './errorMiddleware';

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
	[baseApi.reducerPath]: baseApi.reducer,
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

const customizedMiddleware = getDefaultMiddleware({
	serializableCheck: {
		ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
	},
});

export const store = configureStore({
	reducer: persistedReducer,
	middleware: customizedMiddleware.concat(baseApi.middleware, errorMiddleware),
	devTools: true,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
