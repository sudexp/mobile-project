import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const StartScreen = () => (
  <>
    <SafeAreaView style={styles.container}>
      <Text>Online Store</Text>
      <Text>View Our Collection 2018</Text>
    </SafeAreaView>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StartScreen;
