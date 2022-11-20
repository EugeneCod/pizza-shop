import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filters from './filters';
import pizzas from './pizzas';

const rootReducer = combineReducers({
  filters,
  pizzas,
});

export const store = configureStore({
  reduser: rootReducer,
})