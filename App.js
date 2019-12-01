import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import itemsReducer from './store/reducers/items';
import StoreNavigator from './navigation/StoreNavigator';

const rootReducer = combineReducers({
  items: itemsReducer,
});

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <StoreNavigator />
  </Provider>
);

export default App;
