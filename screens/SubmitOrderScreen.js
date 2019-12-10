import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import FormErrorMessage from '../components/FormErrorMessage';
import Colors from '../constants/Colors';
import { submitOrder } from '../store/actions/orders';
import { clearCart } from '../store/actions/cart';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Must have at least 2 characters!')
    .max(50, 'Can not be longer than 50 characters!')
    .required('Please enter your full name'),
  phone: yup
    .string()
    .matches(/^[0-9]\d{9}$/, {
      message: 'Must have 10 digits!',
      excludeEmptyString: false,
    })
    .required('Please enter your phone number'),
  zipcode: yup
    .string()
    .matches(/^[0-9]\d{4}$/, {
      message: 'Must have 5 digits!',
      excludeEmptyString: false,
    })
    .required('Please enter your ZIP Code'),
  city: yup
    .string()
    .min(2, 'Must have at least 2 characters!')
    .max(30, 'Can not be longer than 30 characters!')
    .required('Please enter your city'),
  address: yup
    .string()
    .min(10, 'Must have at least 10 characters!')
    .max(50, 'Can not be longer than 50 characters!')
    .required('Please enter your address'),
});

const SubmitOrderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.user.token);
  const orderId = useSelector(state => state.cart.orderId);

  const handleSubmitOrder = ({ name, phone, zipcode, city, address }) => {
    console.log('[handleSubmitOrder] ');
    if (
      name.length > 0 &&
      phone.length > 0 &&
      zipcode.length > 0 &&
      city.length > 0 &&
      address.length > 0
    ) {
      const userData = {
        name,
        phone,
        zipcode,
        city,
        address,
      };

      console.log(`- token=${token}, orderId=${orderId}, userData=`, userData);
      dispatch(submitOrder(token, orderId, userData));

      setTimeout(() => {
        dispatch(clearCart());
        navigation.navigate('ConfirmOrder');
      }, 3000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Formik
          initialValues={{
            name: '',
            phone: '',
            zipcode: '',
            city: '',
            address: '',
          }}
          initialErrors={{ isValid: false }}
          onSubmit={values => {
            // console.log('[values]: ', values);
            handleSubmitOrder(values);
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
          }) => (
            <>
              <FormInput
                name="name"
                value={values.name}
                onChangeText={handleChange('name')}
                label="Full Name"
                placeholder="Enter your name"
                autoCapitalize="words"
                iconName={
                  Platform.OS === 'android' ? 'md-person' : 'ios-person'
                }
                iconColor={
                  Platform.OS === 'android' ? Colors.blue : Colors.orange
                }
                onBlur={handleBlur('name')}
                keyboardType="default"
                returnKeyType="next"
                autoFocus
              />
              <FormErrorMessage errorValue={touched.name && errors.name} />
              <FormInput
                name="phone"
                value={values.phone}
                onChangeText={handleChange('phone')}
                label="Phone number"
                placeholder="Enter your phone"
                iconName={
                  Platform.OS === 'android'
                    ? 'md-phone-portrait'
                    : 'ios-phone-portrait'
                }
                iconColor={
                  Platform.OS === 'android' ? Colors.blue : Colors.orange
                }
                onBlur={handleBlur('phone')}
                keyboardType="numeric"
                returnKeyType="next"
              />
              <FormErrorMessage errorValue={touched.phone && errors.phone} />
              <FormInput
                name="zipcode"
                value={values.zipcode}
                onChangeText={handleChange('zipcode')}
                label="ZIP Code"
                placeholder="Enter your ZIP Code"
                iconName={
                  Platform.OS === 'android' ? 'md-mail-open' : 'ios-mail-open'
                }
                iconColor={
                  Platform.OS === 'android' ? Colors.blue : Colors.orange
                }
                onBlur={handleBlur('zipcode')}
                keyboardType="numeric"
                returnKeyType="next"
              />
              <FormErrorMessage
                errorValue={touched.zipcode && errors.zipcode}
              />
              <FormInput
                name="city"
                value={values.city}
                onChangeText={handleChange('city')}
                label="City"
                placeholder="Enter your city"
                autoCapitalize="words"
                iconName={
                  Platform.OS === 'android' ? 'md-business' : 'ios-business'
                }
                iconColor={
                  Platform.OS === 'android' ? Colors.blue : Colors.orange
                }
                onBlur={handleBlur('city')}
                keyboardType="default"
                returnKeyType="next"
                autoCorrect
              />
              <FormErrorMessage errorValue={touched.city && errors.city} />
              <FormInput
                name="address"
                value={values.address}
                onChangeText={handleChange('address')}
                label="Address Line"
                placeholder="Enter your address"
                autoCapitalize="words"
                iconName={Platform.OS === 'android' ? 'md-key' : 'ios-key'}
                iconColor={
                  Platform.OS === 'android' ? Colors.blue : Colors.orange
                }
                onBlur={handleBlur('address')}
                keyboardType="default"
                autoCorrect
              />
              <FormErrorMessage
                errorValue={touched.address && errors.address}
              />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType={Platform.OS === 'android' ? 'solid' : 'outline'}
                  onPress={handleSubmit}
                  title="SUBMIT"
                  buttonColor={
                    Platform.OS === 'android' ? Colors.blue : Colors.orange
                  }
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
            </>
          )}
        </Formik>
        <View style={styles.buttonContainer}>
          <FormButton
            buttonType={Platform.OS === 'android' ? 'solid' : 'outline'}
            onPress={() => {
              // console.log('submit button is pressed');
              navigation.navigate('Cart');
            }}
            title="CANCEL"
            buttonColor={Colors.notvalid}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    margin: 25,
  },
});

export default SubmitOrderScreen;
