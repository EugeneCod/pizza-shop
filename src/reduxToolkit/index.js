import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filters';
import pizzasReducer from './pizzas';

const rootReducer = combineReducers({
  filters: filtersReducer,
  pizzas: pizzasReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

window.store = store;