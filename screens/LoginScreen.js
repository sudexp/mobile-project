import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import FormErrorMessage from '../components/FormErrorMessage';
import Colors from '../constants/Colors';
import { addUser } from '../store/actions/auth';

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
  const dispatch = useDispatch();
  const handleLogin = ({ email, password }) => {
    if (email.length > 0 && password.length > 0) {
      setTimeout(() => {
        navigation.navigate('Collection');
      }, 3000);
    }
  };
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        initialErrors={{ isValid: false }}
        onSubmit={values => {
          // console.log('[values]: ', values);
          dispatch(addUser(values));
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
                onPress={() => {
                  handleSubmit();
                }}
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
      <TouchableComponent onPress={() => navigation.navigate('Signup')}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Don't have an account? Sign Up!</Text>
        </View>
      </TouchableComponent>
    </SafeAreaView>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    headerLeft: null,
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
  textContainer: {
    alignItems: 'center',
  },
  text: {
    color: Platform.OS === 'android' ? Colors.blue : Colors.orange,
    fontSize: 18,
  },
});

export default LoginScreen;
