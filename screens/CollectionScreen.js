import React from 'react';
import { SafeAreaView, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ItemDetail from '../components/Item';
import * as cartActions from '../store/actions/cart';
import CartButton from '../components/CartButton';

const CollectionScreen = ({ navigation }) => {
  const items = useSelector(state => state.items.availableItems);
  // console.log('[items]: ', items);
  // console.log('[navigation]: ', navigation);
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ItemDetail
            image={item.imgUrl}
            brand={item.brand}
            price={item.price}
            viewDetails={() => {
              // console.log('viewDetails pressed');
              navigation.navigate('ItemDetail', {
                itemId: item.id,
                itemBrand: item.brand,
              });
            }}
            addToCart={() => {
              // console.log('addToCart pressed');
              dispatch(cartActions.addToCart(item));
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

CollectionScreen.navigationOptions = {
  headerTitle: 'Collection',
  headerRight: (
    <HeaderButtons HeaderButtonComponent={CartButton}>
      <Item
        title="cart"
        iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => console.log('cart button is pressed')}
      />
    </HeaderButtons>
  ),
};

export default CollectionScreen;