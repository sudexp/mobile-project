import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import CollectionScreen from '../screens/CollectionScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import CartScreen from '../screens/CartScreen';
import Colors from '../constants/Colors';

const MainNavigator = createStackNavigator(
  {
    Collection: { screen: CollectionScreen },
    ItemDetail: { screen: ItemDetailScreen },
    Cart: { screen: CartScreen },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.blue : '',
      },
      headerTintColor: Platform.OS === 'android' ? Colors.white : Colors.orange,
    },
  },
);

export default createAppContainer(MainNavigator);
