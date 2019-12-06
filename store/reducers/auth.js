import { ADD_USER } from '../actions/auth';
import Auth from '../../models/auth';

const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      // console.log('[reducer] ADD_USER');
      const user = new Auth(action.user.email, action.user.password);

      return {
        ...state,
        user: user,
      };

    default:
      return state;
  }
};
