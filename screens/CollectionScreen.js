import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import Item from '../components/Item';
import Colors from '../constants/Colors';

const CollectionScreen = props => {
  const items = useSelector(state => state.items.availableItems);
  console.log(items);
  return (
    <SafeAreaView>
      <FlatList
        data={items}
        keyExtractor={item => item.brand}
        renderItem={({ item }) => (
          <Item
            image={item.imgUrl}
            brand={item.brand}
            price={item.price}
            onViewDetail={() => console.log('viewDetail')}
            onAddToCart={() => console.log('addToCart')}
          />
        )}
      />
    </SafeAreaView>
  );
};

CollectionScreen.navigationOptions = {
  headerTitle: 'Collection',
  // headerTintColor: Colors.orange,
};

export default CollectionScreen;
