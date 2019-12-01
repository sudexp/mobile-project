import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import itemsReducer from './store/reducers/items';
import cartReducer from './store/reducers/cart';
import StoreNavigator from './navigation/StoreNavigator';

const rootReducer = combineReducers({
  items: itemsReducer,
  cart: cartReducer,
});

// remove composeWithDevTools() before deploying app
const store = createStore(rootReducer, composeWithDevTools());

const App = () => (
  <Provider store={store}>
    <StoreNavigator />
  </Provider>
);

export default App;
