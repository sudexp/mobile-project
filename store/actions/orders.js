export const ADD_ORDER = 'ADD_ORDER';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';

export const addOrder = (cartItems, cartTotalPrice) => {
  return {
    type: ADD_ORDER,
    order: { items: cartItems, price: cartTotalPrice },
  };
};

export const submitOrder = userData => {
  return {
    type: SUBMIT_ORDER,
    userData: userData,
  };
};
