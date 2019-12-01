import React from 'react';
import { SafeAreaView, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

const CollectionScreen = props => {
  const items = useSelector(state => state.items.availableItems);
  console.log(items);
  return (
    <SafeAreaView>
      <FlatList
        data={items}
        keyExtractor={item => item.brand}
        renderItem={({ item }) => <Text>{item.brand}</Text>}
      />
    </SafeAreaView>
  );
};

CollectionScreen.navigationOptions = {
  headerTitle: 'CollectionScreen',
};

export default CollectionScreen;
