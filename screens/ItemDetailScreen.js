import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  Platform,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';
import { addToCart } from '../store/actions/cart';
import CartButton from '../components/CartButton';

const ItemDetailScreen = ({ navigation }) => {
  const itemId = navigation.getParam('itemId');
  // console.log('[itemId]: ', itemId);
  // console.log('[navigation]: ', navigation);
  const selectedItem = useSelector(state =>
    state.items.items.find(item => item._id === itemId),
  );
  const token = useSelector(state => state.auth.user.token);
  // console.log('[selectedItem]: ', selectedItem);
  // console.log('[image]: ', selectedItem.image);
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `http://localhost:3000${selectedItem.image}` }}
          />
        </View>
        <View style={styles.actions}>
          <Button
            color={Platform.OS === 'android' ? Colors.blue : Colors.orange}
            title="Add to Cart"
            onPress={() => {
              dispatch(addToCart(selectedItem, token));
            }}
          />
        </View>
        <Text style={styles.price}>€{selectedItem.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedItem.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

ItemDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam('itemBrand'),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CartButton}>
        <Item
          title="cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navigation.navigate('Cart')}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 220,
    marginTop: 50,
  },
  actions: {
    marginBottom: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: Colors.grey,
    textAlign: 'center',
    marginBottom: 40,
  },
  description: {
    fontSize: 15,
    color: Colors.black,
    textAlign: 'left',
    marginHorizontal: 20,
  },
});

export default ItemDetailScreen;
