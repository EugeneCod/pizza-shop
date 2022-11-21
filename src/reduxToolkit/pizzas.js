import { createSlice } from '@reduxjs/toolkit';

const pizzasReducer = createSlice({
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

export default pizzasReducer.reducer;
export const { setPizzas } = pizzasReducer.actions;
