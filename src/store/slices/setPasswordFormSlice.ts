import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
export default setPasswordFormSlice.reducer;
