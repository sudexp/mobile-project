import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';

const ConfirmOrderScreen = ({ navigation }) => {
  const userData = useSelector(state => state.orders.userData);
  // console.log('[userData]: ', userData);
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thank you {userData.name}!</Text>
      </View>
      <Text style={styles.message}>
        Your order is complete and we will send it to your address tomorrow!
      </Text>
      <View style={styles.header}>
        <Text style={styles.text}>Delivery details:</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.wrapper}>
          <View style={styles.key}>
            <Text style={styles.text}>Name: </Text>
          </View>
          <View style={styles.property}>
            <Text style={styles.text}>{userData.name}</Text>
          </View>
          <View style={styles.key}>
            <Text style={styles.text}>Phone: </Text>
          </View>
          <View style={styles.property}>
            <Text style={styles.text}>{userData.phone}</Text>
          </View>
          <View style={styles.key}>
            <Text style={styles.text}>ZIP Code: </Text>
          </View>
          <View style={styles.property}>
            <Text style={styles.text}>{userData.zipcode}</Text>
          </View>
          <View style={styles.key}>
            <Text style={styles.text}>City: </Text>
          </View>
          <View style={styles.property}>
            <Text style={styles.text}>{userData.city}</Text>
          </View>
          <View style={styles.key}>
            <Text style={styles.text}>Address: </Text>
          </View>
          <View style={styles.property}>
            <Text style={styles.text}>{userData.address}</Text>
          </View>
        </View>
      </View>
      <TouchableComponent
        onPress={() => {
          navigation.navigate('Collection');
        }}>
        <View style={styles.buttonContainer}>
          <Text style={styles.button}>Go to Collection</Text>
        </View>
      </TouchableComponent>
      <TouchableComponent
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <View style={styles.buttonContainer}>
          <Text style={styles.button}>Sign Out</Text>
        </View>
      </TouchableComponent>
    </SafeAreaView>
  );
};

ConfirmOrderScreen.navigationOptions = () => {
  return {
    headerTitle: 'Confirm Order',
    headerLeft: null,
  };
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 25,
  },
  message: {
    fontSize: 16,
    color: Colors.grey,
  },
  text: {
    fontSize: 16,
  },
  details: {
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
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 25,
  },
  key: {
    width: '35%',
    height: '20%',
    paddingHorizontal: 20,
  },
  property: {
    width: '65%',
    height: '20%',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  button: {
    color: Platform.OS === 'android' ? Colors.blue : Colors.orange,
    fontSize: 18,
  },
});

export default ConfirmOrderScreen;
