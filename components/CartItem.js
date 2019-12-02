import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';

const CartItem = ({ quantity, brand, price, onRemove }) => {
  // console.log('[props]: ', props);
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{brand} </Text>
        <Text style={styles.quantity}> x </Text>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.price}>€{price.toFixed(2)}</Text>
        <TouchableComponent
          onPress={onRemove}
          style={styles.removeButton}
          useForeground>
          <Icon
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color={Colors.notvalid}
          />
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    color: Colors.grey,
    fontSize: 16,
  },
  price: {
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 20,
  },
});

export default CartItem;
