import React, { useEffect } from 'react';
import {
  SafeAreaView,
  Animated,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';

const StartScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Online Store</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? Colors.blue : Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.orange,
    fontSize: 40,
  },
});

export default StartScreen;
