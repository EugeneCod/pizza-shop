import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filterSlice';
import pizzasReducer from './slices/pizzasSlice';

const rootReducer = combineReducers({
  filter: filtersReducer,
  pizzas: pizzasReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

window.Storage = store;
