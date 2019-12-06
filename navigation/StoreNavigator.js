import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CollectionScreen from '../screens/CollectionScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import CartScreen from '../screens/CartScreen';
import SubmitOrderScreen from '../screens/SubmitOrderScreen';
import Colors from '../constants/Colors';

const MainNavigator = createStackNavigator(
  {
    Start: { screen: StartScreen },
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Collection: { screen: CollectionScreen },
    ItemDetail: { screen: ItemDetailScreen },
    Cart: { screen: CartScreen },
    SubmitOrder: { screen: SubmitOrderScreen },
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
