import { ADD_ORDER, SUBMIT_ORDER } from '../actions/orders';
import Order from '../../models/order';
import UserData from '../../models/userData';

const initialState = {
  orders: [],
  userData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        new Date(),
        action.order.items,
        action.order.price,
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };

    case SUBMIT_ORDER:
      // console.log('[reducer] SUBMIT_ORDER');
      const userData = new UserData(
        action.userData.name,
        action.userData.phone,
        action.userData.zipcode,
        action.userData.city,
        action.userData.address,
      );

      return {
        ...state,
        userData: userData,
      };

    default:
      return state;
  }
};
