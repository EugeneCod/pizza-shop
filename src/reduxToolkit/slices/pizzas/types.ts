export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SearchPizzaParams = {
  order: string;
  sortBy: string; 
  category: string;
  search: string;
  currentPage: string;
}

export type Pizza = {
  id: string;
  title: string; 
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
}

export interface PizzaSliseState {
  items: Pizza[],
  status: Status,
}