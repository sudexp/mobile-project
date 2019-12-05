export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, cartTotalPrice) => {
  return {
    type: ADD_ORDER,
    order: { items: cartItems, price: cartTotalPrice },
  };
};
