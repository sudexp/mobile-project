import { ADD_TO_CART } from '../actions/cart';
import Cart from '../../models/cart';

const initialState = {
  items: {},
  totalPrice: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedItem = action.item;
      const itemPrice = addedItem.price;
      const itemBrand = addedItem.brand;

      // check if this item already in the cart
      if (state.items[addedItem.id]) {
        const updatedCart = new Cart(
          state.items[addedItem.id].quantity + 1,
          itemPrice,
          itemBrand,
          state.items[addedItem.id].sum + itemPrice,
        );
        return {
          ...state,
          items: {
            ...state.items,
            [addedItem.id]: updatedCart,
          },
          totalPrice: state.totalPrice + itemPrice,
        };
      } else {
        const newCart = new Cart(1, itemPrice, itemBrand, itemPrice);
        return {
          ...state,
          items: {
            ...state.items,
            [addedItem.id]: newCart,
          },
          totalPrice: state.totalPrice + itemPrice,
        };
      }
  }
  return state;
};
