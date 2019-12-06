import { ADD_ORDER, SUBMIT_ORDER } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  orders: [],
  userData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.order.items,
        action.order.price,
        new Date(),
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    // case SUBMIT_ORDER:
    default:
      return state;
  }
};
