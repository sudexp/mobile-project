import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Item from '../components/Item';
import * as cartActions from '../store/actions/cart';

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
          <Item
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
};

export default CollectionScreen;
