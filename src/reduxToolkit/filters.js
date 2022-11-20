import { createSlice } from '@reduxjs/toolkit';

const filters = createSlice({
  name: 'filters',
  initialState: {
    categoty: 0,
    sortBy: 'popular',
  },
  reducers: {
    setCategoty(state, action) {
      state.categoty = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
});

export default filters.reducer;
export const { setCategoty, setSortBy } = filters.actions;
