import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyes {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

export type Sort = {
  name: string,
  sortProperty: SortPropertyes,
}

interface FilterSliceState {
  searchValue: string,
  categoryId: number,
  currentPage: number,
  sort: Sort,
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности (убыв.)', sortProperty: SortPropertyes.RATING_DESC },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.categoryId = Number(action.payload.categoryId);
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
        state.searchValue = action.payload.searchValue;
      } else {
        state = initialState;
      }
      
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterSort = (state: RootState) => state.filter.sort;

export default filterSlice.reducer;
export const { setSearchValue, setCategoryId, setCurrentPage, setSort, setFilters } = filterSlice.actions;
