import { createSlice } from '@reduxjs/toolkit';

const pizzas = createSlice({
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

export default pizzas.reducer;
export const { setCategoty, setSortBy } = pizzas.actions;
