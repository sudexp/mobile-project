import React from 'react';
import { SafeAreaView, View, Platform, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import FormErrorMessage from '../components/FormErrorMessage';
import Colors from '../constants/Colors';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(5, 'Password must have more than 5 characters'),
});

const LoginScreen = ({ navigation }) => {
  const goToSignup = () => navigation.navigate('Signup');

  const handleLogin = ({ email, password }) => {
    if (email.length > 0 && password.length > 0) {
      setTimeout(() => {
        navigation.navigate('Collection');
      }, 3000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        initialErrors={{ isValid: false }}
        onSubmit={values => {
          handleLogin(values);
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
              name="email"
              value={values.email}
              onChangeText={handleChange('email')}
              label="Email"
              placeholder="Enter email"
              autoCapitalize="none"
              iconName={Platform.OS === 'android' ? 'md-mail' : 'ios-mail'}
              iconColor={
                Platform.OS === 'android' ? Colors.blue : Colors.orange
              }
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              returnKeyType="next"
              autoFocus
            />
            <FormErrorMessage errorValue={touched.email && errors.email} />
            <FormInput
              name="password"
              value={values.password}
              onChangeText={handleChange('password')}
              label="Password"
              placeholder="Enter password"
              secureTextEntry
              iconName={Platform.OS === 'android' ? 'md-lock' : 'ios-lock'}
              iconColor={
                Platform.OS === 'android' ? Colors.blue : Colors.orange
              }
              onBlur={handleBlur('password')}
              keyboardType="default"
            />
            <FormErrorMessage
              errorValue={touched.password && errors.password}
            />
            <View style={styles.buttonContainer}>
              <FormButton
                buttonType={Platform.OS === 'android' ? 'solid' : 'outline'}
                onPress={handleSubmit}
                title="LOGIN"
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
      <Button
        title="Don't have an account? Sign Up!"
        onPress={goToSignup}
        titleStyle={styles.text}
        type="clear"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    margin: 25,
  },
  text: {
    color: Platform.OS === 'android' ? Colors.blue : Colors.blue,
  },
});

export default LoginScreen;
