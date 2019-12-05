import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import CartItem from '../components/CartItem';
import { removeFromCart, clearCart } from '../store/actions/cart';
import { addOrder } from '../store/actions/orders';

const CartScreen = ({ navigation }) => {
  const cartTotalPrice = useSelector(state => state.cart.totalPrice);
  const cartItems = useSelector(state => state.cart.items);
  console.log('[cartItems]: ', cartItems);
  const cartItemsArray = Object.keys(cartItems).map(i => {
    // cartItems[i].itemId = i
    // return cartItems[i]
    return { ...cartItems[i], itemId: i };
  });
  // console.log('[cartItemsArray]: ', cartItemsArray);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.total}>
        <Text style={styles.totalText}>
          Total: <Text style={styles.price}>€{cartTotalPrice.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.valid}
          title="Order Now"
          disabled={cartItemsArray.length === 0}
          onPress={() => {
            // console.log('order button is pressed');
            dispatch(addOrder(cartItems, cartTotalPrice));
            dispatch(clearCart());
            navigation.navigate('SubmitOrder');
          }}
        />
      </View>
      <FlatList
        data={cartItemsArray}
        keyExtractor={item => item.itemId}
        renderItem={({ item }) => {
          // console.log('[item]: ', item);
          return (
            <CartItem
              quantity={item.quantity}
              brand={item.itemBrand}
              price={item.sum}
              onRemove={() => dispatch(removeFromCart(item.itemId))}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

CartScreen.navigationOptions = () => {
  return {
    headerTitle: 'Cart',
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  total: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  totalText: {
    fontSize: 18,
  },
  price: {
    color: Colors.black,
  },
});

export default CartScreen;
