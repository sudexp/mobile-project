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
    state.items.availableItems.find(item => item.id === itemId),
  );
  // console.log('[selectedItem]: ', selectedItem);
  // console.log('[imageUrl]: ', selectedItem.imgUrl);
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <ScrollView>
        <Image style={styles.image} source={{ uri: selectedItem.imgUrl }} />
        <View style={styles.actions}>
          <Button
            color={Platform.OS === 'android' ? Colors.blue : Colors.orange}
            title="Add to Cart"
            onPress={() => {
              dispatch(addToCart(selectedItem));
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
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: Colors.grey,
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    color: Colors.black,
    textAlign: 'left',
    marginHorizontal: 20,
  },
});

export default ItemDetailScreen;
