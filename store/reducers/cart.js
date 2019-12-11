import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/cart';
import CartItem from '../../models/cart';

const initialState = {
  orderId: null,
  items: {},
  totalPrice: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const orderId = action.orderId;
      const addedItem = action.item;
      const itemPrice = addedItem.price;
      const itemBrand = addedItem.brand;
      const orderItemId = addedItem.orderItemId;
      const itemId = addedItem.itemId;
      console.log(`[cart reducer]: orderId=${orderId}, itemBrand=${itemBrand}`);

      // check if this item already in the cart
      if (state.items[itemId]) {
        const updatedCartItem = new CartItem(
          state.items[itemId].quantity + 1,
          orderItemId,
          itemId,
          itemPrice,
          itemBrand,
          state.items[itemId].sum + itemPrice,
        );

        return {
          ...state,
          orderId,
          items: {
            ...state.items,
            [itemId]: updatedCartItem,
          },
          totalPrice: state.totalPrice + itemPrice,
        };
      } else {
        const newCart = new CartItem(
          1,
          orderItemId,
          itemId,
          itemPrice,
          itemBrand,
          itemPrice,
        );

        return {
          ...state,
          orderId,
          items: {
            ...state.items,
            [itemId]: newCart,
          },
          totalPrice: state.totalPrice + itemPrice,
        };
      }

    case REMOVE_FROM_CART:
      const selectedItem = state.items[action.itemId];
      // console.log('[selectedItem]: ', selectedItem);
      const selectedItemQuantity = selectedItem.quantity;
      let updatedItems;

      // check if this item need to reduce or remove
      if (selectedItemQuantity > 1) {
        const updatedItem = new CartItem(
          selectedItem.quantity - 1,
          selectedItem.orderItemId,
          selectedItem.itemId,
          selectedItem.itemPrice,
          selectedItem.itemBrand,
          selectedItem.sum - selectedItem.itemPrice,
        );

        updatedItems = { ...state.items, [action.itemId]: updatedItem };
      } else {
        updatedItems = { ...state.items };
        delete updatedItems[action.itemId];
      }

      return {
        ...state,
        items: updatedItems,
        totalPrice: state.totalPrice - selectedItem.itemPrice,
      };
    // clear cart
    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};
