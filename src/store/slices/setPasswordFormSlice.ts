import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/store';

export interface setPasswordFormDataType {
	email: string;
	otp: string;
}
interface setPasswordFormState {
	setPasswordFormData: setPasswordFormDataType;
}

const initialState: setPasswordFormState = {
	setPasswordFormData: {
		email: '',
		otp: '',
	},
};

const setPasswordFormSlice = createSlice({
	name: 'setPasswordForm',
	initialState,
	reducers: {
		updateSetPasswordForm: (
			state,
			action: PayloadAction<setPasswordFormDataType>
		) => {
			state.setPasswordFormData = action.payload;
		},

		resetSetPasswordForm: (state) => {
			state.setPasswordFormData = initialState.setPasswordFormData;
		},
	},
});

export const { updateSetPasswordForm, resetSetPasswordForm } =
	setPasswordFormSlice.actions;

// selectors
export const selectSetPasswordFormData = (state: RootState) =>
	state.setPasswordForm.setPasswordFormData;

export default setPasswordFormSlice.reducer;
