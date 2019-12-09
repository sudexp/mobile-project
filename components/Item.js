import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import Colors from '../constants/Colors';

const Item = ({ image, brand, price, viewDetails, addToCart }) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.container}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={viewDetails} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: `http://localhost:3000${image}` }}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.brand}>{brand}</Text>
              <Text style={styles.price}>€{price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <Button
                color={Platform.OS === 'android' ? Colors.blue : Colors.orange}
                title="View Details"
                onPress={viewDetails}
              />
              <Button
                color={Platform.OS === 'android' ? Colors.blue : Colors.orange}
                title="To Cart"
                onPress={addToCart}
              />
            </View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '80%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 5,
  },
  brand: {
    fontSize: 18,
    color: Colors.black,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: Colors.grey,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
});

export default Item;
