import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import Input from '../components/Input';

const SubmitOrderScreen = props => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="fullName"
            label="Full Name"
            errorText="Please enter a valid name!"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
            required
          />
          <Input
            id="phone"
            label="Phone"
            errorText="Please enter a valid phone!"
            keyboardType="numeric"
            returnKeyType="next"
            required
          />
          <Input
            id="email"
            label="Email"
            errorText="Please enter a valid enail!"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
            required
          />
          <Input
            id="phone"
            label="Phone"
            errorText="Please enter a valid phone!"
            keyboardType="numeric"
            returnKeyType="next"
            required
          />
          <Input
            id="zipCode"
            label="ZIP Code"
            errorText="Please enter a valid image zipCode!"
            keyboardType="numeric"
            returnKeyType="next"
            required
          />
          <Input
            id="city"
            label="City"
            errorText="Please enter a valid city!"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
            required
          />
          <Input
            id="addressLine"
            label="Address Line"
            errorText="Please enter a valid address!"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect
            multiline
            numberOfLines={2}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

SubmitOrderScreen.navigationOptions = () => {
  return {
    headerTitle: 'Submit Order',
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    margin: 20,
  },
});

export default SubmitOrderScreen;
