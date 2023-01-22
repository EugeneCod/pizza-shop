import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Pizza, SearchPizzaParams, PizzaSliseState, Status } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizzas/fetchPizzasStatus', async (params) => {
  const { order, sortBy, category, search, currentPage } = params;
  const { data } = await axios.get<Pizza[]>(
    `https://63b939b56f4d5660c6e81059.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});

const initialState: PizzaSliseState = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.items = [];
        state.status = Status.LOADING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        console.log('Произошла ошибка');
        state.items = [];
        state.status = Status.ERROR;
      });
  },
});

export default pizzasSlice.reducer;
export const { setPizzas } = pizzasSlice.actions;
