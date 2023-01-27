import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import calcTotalPrice from '../../utils/calcTotalPrice';
import getCartFromLS from '../../utils/getCartFromLS';
import { CartItem, CartSliceState } from './types';

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      if (!findItem) {
        state.items.push({ ...action.payload, count: 1 });
        return;
      }
      const matchByType = findItem.type === action.payload.type;
      const matchBySize = findItem.size === action.payload.size;
      matchByType && matchBySize && findItem.count
        ? findItem.count++
        : state.items.push({ ...action.payload, count: 1 });
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const index = state.items.findIndex((obj) => 
        obj.id === action.payload.id &&
        obj.type === action.payload.type &&
        obj.size === action.payload.size,
      );
      if (index !== -1) {
        state.items.splice(index, 1).slice();
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      findItem?.count && findItem.count--;
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
