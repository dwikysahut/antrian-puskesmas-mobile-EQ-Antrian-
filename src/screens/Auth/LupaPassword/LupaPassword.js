import {
  Input,
  Text,
  Stack,
  Pressable,
  Icon,
  Button,
  ScrollView,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import {color} from '../../../utils/Color';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomForm from '../../../Components/CustomForm';
import {forgotPasswordUser} from '../../../utils/http';
import {
  dialogFeedback,
  errorFetchWithFeedback,
} from '../../../utils/functionHelper';

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

const formState = {email: ''};
const LupaPassword = ({route, navigation}) => {
  const forgotPasswordValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Masukkan Email yang valid')
      .required('Email Harus Diisi'),
  });
  const onSubmitHandler = async (formData, {resetForm}) => {
    try {
      const response = await forgotPasswordUser({
        email: formData.email,
      });
      if (response.status == 200 || response.data.status == 200) {
        dialogFeedback(
          'Success',
          response.data.message,
          true,
          ALERT_TYPE.SUCCESS,
          2000,
          () => {
            navigation.navigate('Login');
          },
        );
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      errorFetchWithFeedback(error, navigation.navigate, 2000, null);
    } finally {
      resetForm();
    }
  };

  useEffect(() => {});
  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        enabled>
        <ScrollView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Text style={styles.headline}>Lupa Password</Text>
              <Text style={styles.subHeadline}>
                Password baru akan dikirimkan melalui email anda
              </Text>
              <Formik
                validateOnChange={false}
                enableReinitialize
                initialValues={{...formState}}
                validationSchema={forgotPasswordValidationSchema}
                onSubmit={onSubmitHandler}>
                {({handleChange, handleSubmit, values, errors, isValid}) => (
                  <Stack space={4} w="100%" maxW="350px" mx="auto">
                    <CustomForm
                      errors={errors.email}
                      handleChange={handleChange('email')}
                      isValid={isValid}
                      values={values.email}
                      keyboardType="email-address"
                      placeholder="Email"
                    />

                    <Button
                      variant="outline"
                      backgroundColor={color.main}
                      onPress={handleSubmit}>
                      <Text color="white">Submit</Text>
                    </Button>
                  </Stack>
                )}
              </Formik>
              <View style={{flex: 1}} />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </AlertNotificationRoot>
  );
};

export default LupaPassword;
