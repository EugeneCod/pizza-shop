import { CartItem } from '../reduxToolkit/cart/types';
import calcTotalPrice from './calcTotalPrice';

const getCartFromLS = () => {
  const cartItemsJson = localStorage.getItem('cartItems');
  const items: CartItem[] = cartItemsJson ? JSON.parse(cartItemsJson) : [];
  const totalPrice = calcTotalPrice(items);
  return {
    items,
    totalPrice,
  };
};

export default getCartFromLS;
