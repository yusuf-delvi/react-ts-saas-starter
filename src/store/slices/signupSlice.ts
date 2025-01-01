import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/store';

export interface signUpFormDataType {
	name: string;
	email: string;
	password: string;
}
interface signUpFormState {
	step: number;
	signUpFormData: signUpFormDataType;
	userId: string;
}

const initialState: signUpFormState = {
	step: 1,
	signUpFormData: {
		name: '',
		email: '',
		password: '',
	},
	userId: '',
};

const signUpFormSlice = createSlice({
	name: 'signUpForm',
	initialState,
	reducers: {
		updateStep: (state, action: PayloadAction<number>) => {
			state.step = action.payload;
		},
		updateSignUpForm: (state, action: PayloadAction<signUpFormDataType>) => {
			state.signUpFormData = action.payload;
		},
		updateSignUpEmail: (state, action: PayloadAction<string>) => {
			state.signUpFormData.email = action.payload;
		},

		resetsignUpForm: (state) => {
			state.signUpFormData = initialState.signUpFormData;
		},
		updateUserId: (state, action: PayloadAction<string>) => {
			state.userId = action.payload;
		},
		resetStep: (state) => {
			state.step = initialState.step;
		},
	},
});

export const {
	updateStep,
	updateSignUpForm,
	updateSignUpEmail,
	resetsignUpForm,
	updateUserId,
	resetStep,
} = signUpFormSlice.actions;

export default signUpFormSlice.reducer;

// selectors
export const selectSignUpForm = (state: RootState) => state.signUpForm;
export const selectSignUpFormData = (state: RootState) =>
	state.signUpForm.signUpFormData;
export const selectSignUpStep = (state: RootState) => state.signUpForm.step;
