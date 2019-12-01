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
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';

const ItemDetailScreen = ({ navigation }) => {
  const itemId = navigation.getParam('itemId');
  // console.log('[itemId]: ', itemId);
  // console.log('[navigation]: ', navigation);
  const selectedItem = useSelector(state =>
    state.items.availableItems.find(item => item.id === itemId),
  );
  // console.log('[selectedItem]: ', selectedItem);
  // console.log('[imageUrl]: ', selectedItem.imgUrl);

  return (
    <SafeAreaView>
      <ScrollView>
        <Image style={styles.image} source={{ uri: selectedItem.imgUrl }} />
        <View style={styles.actions}>
          <Button
            color={Platform.OS === 'android' ? Colors.blue : Colors.orange}
            title="Add to Cart"
            onPress={() => {}}
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
