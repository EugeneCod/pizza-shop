import { combineReducers, configureStore } from '@reduxjs/toolkit';

import filtersReducer from './slices/filterSlice';
import pizzasReducer from './slices/pizzasSlice';
import cartReducer from './slices/cartSlice';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  filter: filtersReducer,
  pizzas: pizzasReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// typeof store.getState возвращает функцию, возвращающую весь redux стейт
// ReturnType - логика redux, извлекающая тип из функции
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;

// typeof store.getState возвращает все типы actions их хранилища
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
