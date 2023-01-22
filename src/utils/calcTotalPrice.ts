import { CartItem } from "../reduxToolkit/slices/cart/types";

const calcTotalPrice = (cartItems: CartItem[]) => {
  const totalPrice = cartItems.reduce((sum, obj) => {
    if (!obj.count) return obj.price + sum;
    return obj.price * obj.count + sum;
  }, 0);
  return totalPrice;
}

export default calcTotalPrice; 