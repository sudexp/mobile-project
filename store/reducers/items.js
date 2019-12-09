// import Items from '../../data/dummy-data';
import { FETCH_ITEMS } from '../actions/items';

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      // console.log('[reducer] FETCH_ITEMS');
      // console.log('[action]', action);

      return {
        ...state,
        items: action.items,
      };

    default:
      return state;
  }
};
