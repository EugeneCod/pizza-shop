import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import calcTotalPrice from '../../utils/calcTotalPrice';
import getCartFromLS from '../../utils/getCartFromLS';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count?: number;
}

interface CartSliceState {
  totalPrice: number,
  items: CartItem[],
}

const { items,totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

// const recalculatePrice = (state: CartSliceState)  => {
//   state.totalPrice = state.items.reduce((sum, obj) => {
//     if (!obj.count) return obj.price + sum;
//     return obj.price * obj.count + sum;
//   }, 0);
// }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      findItem?.count ? findItem.count++ : state.items.push({ ...action.payload, count: 1 });
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      findItem?.count && findItem.count--;
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id)

export default cartSlice.reducer;
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
