import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';

const FormInput = ({ iconName, iconColor, name, placeholder, ...rest }) => (
  <View style={styles.container}>
    <Input
      {...rest}
      leftIcon={<Icon name={iconName} size={28} color={iconColor} />}
      leftIconContainerStyle={styles.icon}
      placeholderTextColor={Colors.grey}
      name={name}
      placeholder={placeholder}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  icon: {
    marginRight: 10,
  },
});

export default FormInput;
