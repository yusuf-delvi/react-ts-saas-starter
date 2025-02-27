import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/store';

interface ErrorState {
	open: boolean;
	message: string;
}

const initialState: ErrorState = {
	open: false,
	message: '',
};

export const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		showError: (state, action: PayloadAction<string>) => {
			state.open = true;
			state.message = action.payload;
		},
		hideError: (state) => {
			state.message = '';
			state.open = false;
		},
	},
});

export const { showError, hideError } = errorSlice.actions;

export default errorSlice.reducer;

// selectors
export const selectError = (state: RootState) => state.error;
