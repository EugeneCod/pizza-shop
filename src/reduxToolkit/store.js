import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filterSlice';
import pizzasReducer from './slices/pizzasSlice';
import cartReducer from './slices/cartSlice';

const rootReducer = combineReducers({
  filter: filtersReducer,
  pizzas: pizzasReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

window.Storage = store;
