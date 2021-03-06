import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';

const CartButton = props => (
  <HeaderButton
    {...props}
    IconComponent={Icon}
    iconSize={23}
    color={Platform.OS === 'android' ? Colors.white : Colors.orange}
  />
);

export default CartButton;
