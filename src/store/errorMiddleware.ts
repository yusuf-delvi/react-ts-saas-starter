import { showError } from '@store/slices/errorSlice';
import { Middleware } from 'redux';

export const errorMiddleware: Middleware = (storeAPI) => (next) => (action) => {
	if (action && action?.error) {
		storeAPI.dispatch(showError(action?.payload.data.message.toString()));
	}
	return next(action);
};
