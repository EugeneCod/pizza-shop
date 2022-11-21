import { createSlice } from '@reduxjs/toolkit';

const filtersReducer = createSlice({
  name: 'filters',
  initialState: {
    categoty: 0,
    sortBy: 'popular',
  },
  reducers: {
    setCategory(state, action) {
      state.categoty = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
});

export default filtersReducer.reducer;
export const { setCategory, setSortBy } = filtersReducer.actions;
