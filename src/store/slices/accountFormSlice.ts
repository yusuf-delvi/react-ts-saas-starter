import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/store';

export interface AccountFormState {
	fullName: string;
	email: string;
	userName?: string;
	profilePicUrl?: string;
}

export interface ProjectState {
	step: number;
	accountFormData: AccountFormState;
}

const initialState: ProjectState = {
	step: 1,
	accountFormData: {
		fullName: '',
		email: '',
		userName: '',
		profilePicUrl: '',
	},
};

const accountFormSlice = createSlice({
	name: 'accountForm',
	initialState,
	reducers: {
		updateAccountFormData: (state, action: PayloadAction<AccountFormState>) => {
			state.accountFormData = action.payload;
		},
		updateStep: (state, action: PayloadAction<number>) => {
			state.step = action.payload;
		},
		resetSettingsStep: (state) => {
			state.step = initialState.step;
		},
	},
});

export const { updateAccountFormData, updateStep, resetSettingsStep } =
	accountFormSlice.actions;

export default accountFormSlice.reducer;

// selectors
export const selectStep = (state: RootState) => state.accountForm.step;
export const selectAccountFormData = (state: RootState) =>
	state.accountForm.accountFormData;
