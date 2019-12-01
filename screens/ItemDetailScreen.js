import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ItemDetailScreen = ({ navigation }) => {
  const itemId = navigation.getParam('itemId');
  const selectedItem = useSelector(state =>
    state.items.availableItems.find(item => item.id === itemId),
  );

  return (
    <SafeAreaView>
      <Text>{selectedItem.brand}</Text>
    </SafeAreaView>
  );
};

ItemDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('itemBrand'),
  };
};

const styles = StyleSheet.create({});

export default ItemDetailScreen;
