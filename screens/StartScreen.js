import React, { useEffect } from 'react';
import { SafeAreaView, Platform, StyleSheet } from 'react-native';

import BlinkingText from '../components/BlinkingText';
import Colors from '../constants/Colors';

const StartScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 5500);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <BlinkingText text="Online Store" />
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
});

export default StartScreen;
