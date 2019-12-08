import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Button,
  Platform,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';

const SignupScreen = ({ navigation }) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.message}>
        User registration is not available at the moment!
      </Text>
      <TouchableComponent onPress={() => navigation.navigate('Login')}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Log In!</Text>
        </View>
      </TouchableComponent>
    </SafeAreaView>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerLeft: null,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: { fontSize: 16 },
  text: {
    padding: 25,
    fontSize: 20,
    color: Platform.OS === 'android' ? Colors.blue : Colors.orange,
  },
});

export default SignupScreen;
