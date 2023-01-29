import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfirmSliceState } from './types';

const initialState: ConfirmSliceState = {
  show: false,
  text: ''
}

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    setShowConfirm(state, action: PayloadAction<string>) {
      state.show = true;
      state.text = action.payload;
    },
    setHideConfirm(state) {
      state.show = initialState.show;
      state.text = initialState.text;
    },
  },
});

export default confirmSlice.reducer;
export const { setShowConfirm, setHideConfirm } = confirmSlice.actions;