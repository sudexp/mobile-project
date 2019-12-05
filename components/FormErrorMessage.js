import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const FormErrorMessage = ({ errorValue }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
  },
  errorText: {
    color: Colors.notvalid,
  },
});

export default FormErrorMessage;
