import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ItemDetail from '../components/Item';
import { fetchItems } from '../store/actions/items';
import { addToCart } from '../store/actions/cart';
import CartButton from '../components/CartButton';
import Colors from '../constants/Colors';

const CollectionScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(); // initially error is undefined
  const items = useSelector(state => state.items.items);
  console.log('[items]: ', items);
  // console.log('[navigation]: ', navigation);
  const dispatch = useDispatch();

  const loadItems = useCallback(async () => {
    setIsLoading(null);
    setIsLoading(true);
    try {
      await dispatch(fetchItems());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadItems();
  }, [dispatch, loadItems]);

  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  if (isLoading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator
          size="large"
          color={Platform.OS === 'android' ? Colors.blue : Colors.orange}
        />
      </View>
    );
  }

  if (isLoading && items.length === 0) {
    return (
      <View style={styles.spinner}>
        <Text>No items found!</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.spinner}>
        <Text>An error occured.</Text>
        <TouchableComponent onPress={loadItems}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Try again!</Text>
          </View>
        </TouchableComponent>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={items}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ItemDetail
            image={item.image}
            brand={item.brand}
            price={item.price}
            viewDetails={() => {
              // console.log('viewDetails pressed');
              navigation.navigate('ItemDetail', {
                itemId: item._id,
                itemBrand: item.brand,
              });
            }}
            addToCart={() => {
              // console.log('addToCart pressed');
              dispatch(addToCart(item));
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

CollectionScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Collection',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CartButton}>
        <Item
          title="cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navigation.navigate('Cart')}
        />
      </HeaderButtons>
    ),
    headerLeft: null,
  };
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  text: {
    color: Platform.OS === 'android' ? Colors.blue : Colors.orange,
    fontSize: 18,
  },
});

export default CollectionScreen;
