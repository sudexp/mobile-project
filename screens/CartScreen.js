import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import CartItem from '../components/CartItem';

const CartScreen = () => {
  const cartTotalPrice = useSelector(state => state.cart.totalPrice);
  const cartItems = useSelector(state => state.cart.items);
  // console.log('[cartItems]: ', cartItems);
  const cartItemsArray = Object.keys(cartItems).map(i => cartItems[i]);
  // console.log('[cartItemsArray]: ', cartItemsArray);

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
          onPress={() => console.log('order button is pressed')}
        />
      </View>
      <FlatList
        data={cartItemsArray}
        keyExtractor={item => item.itemBrand}
        renderItem={({ item }) => (
          <CartItem
            quantity={item.quantity}
            brand={item.itemBrand}
            price={item.sum}
            onRemove={() => console.log('remove button is pressed')}
          />
        )}
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
    shadowRadius: 8,
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
