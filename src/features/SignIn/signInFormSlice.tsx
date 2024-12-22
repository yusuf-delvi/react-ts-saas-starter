import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface signInFormDataType {
  email: string;
  password: string;
}
interface signInFormState {
  step: number;
  signInFormData: signInFormDataType;
}

const initialState: signInFormState = {
  step: 1,
  signInFormData: {
    email: '',
    password: '',
  },
};

const signInFormSlice = createSlice({
  name: 'signInForm',
  initialState,
  reducers: {
    updateStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    updateSignInForm: (state, action: PayloadAction<signInFormDataType>) => {
      state.signInFormData = action.payload;
    },

    resetSignInForm: (state) => {
      state.signInFormData = initialState.signInFormData;
    },
    resetStep: (state) => {
      state.step = initialState.step;
    },
  },
});

export const { updateStep, updateSignInForm, resetSignInForm, resetStep } =
  signInFormSlice.actions;
export default signInFormSlice.reducer;
