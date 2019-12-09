import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth';
import itemsReducer from './store/reducers/items';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';

import StoreNavigator from './navigation/StoreNavigator';

const rootReducer = combineReducers({
  auth: authReducer,
  items: itemsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

// remove composeWithDevTools() before deploying app
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const App = () => (
  <Provider store={store}>
    <StoreNavigator />
  </Provider>
);

export default App;
