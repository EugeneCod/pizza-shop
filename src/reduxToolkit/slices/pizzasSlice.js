import { createSlice } from '@reduxjs/toolkit';

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: {
    items: [],
    // isLoaded: false,
  },
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
      // state.isLoaded = true;
    },
  },
});

export default pizzasSlice.reducer;
export const { setPizzas } = pizzasSlice.actions;
