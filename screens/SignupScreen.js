import React from 'react';
import { SafeAreaView, Button, Text, Platform, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const SignupScreen = ({ navigation }) => {
  const goToLogin = () => navigation.navigate('Login');

  return (
    <SafeAreaView style={styles.container}>
      <Text>User registration is not available at the moment!</Text>
      <Button
        color={Platform.OS === 'android' ? Colors.blue : Colors.orange}
        title="Log In"
        onPress={goToLogin}
      />
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
});

export default SignupScreen;
