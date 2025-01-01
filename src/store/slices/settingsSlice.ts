import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/store';

export interface ProjectState {
	isSettingsOpen: boolean;
}

const initialState: ProjectState = {
	isSettingsOpen: false,
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		updateIsSettingsOpen: (state, action: PayloadAction<ProjectState>) => {
			state.isSettingsOpen = action.payload.isSettingsOpen;
		},
	},
});

export const { updateIsSettingsOpen } = settingsSlice.actions;
export default settingsSlice.reducer;

// selectors
export const selectIsSettingsOpen = (state: RootState) =>
	state.settings.isSettingsOpen;
