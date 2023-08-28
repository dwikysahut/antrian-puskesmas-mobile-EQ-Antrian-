import {Text, Stack, Button, ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import {emailVerifyUser} from '../../../utils/http';
import {color} from '../../../utils/Color';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomForm from '../../../Components/CustomForm';
import {
  dialogFeedback,
  errorFetchWithFeedback,
  showToast2,
} from '../../../utils/functionHelper';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
} from 'react-native-alert-notification';

const formState = {
  kode_verifikasi_email: '',
};

const EmailVerification = ({route}) => {
  const {user_id} = route.params;
  const navigation = useNavigation();
  const deviceWidth = Dimensions.get('window').width;

  const emailVerifyValidationSchema = yup.object().shape({
    kode_verifikasi_email: yup
      .string()
      .length(
        6,
        ({length}) => `Kode Verifikasi terdiri dari ${length} karakter`,
      )
      .required('Kode Verifikasi Harus Diisi'),
  });

  const [show, setShow] = useState('false');

  const onSubmitHandler = async (formData, {resetForm}) => {
    console.log(formData);
    try {
      const response = await emailVerifyUser({
        user_id: user_id,
        kode_verifikasi_email: formData.kode_verifikasi_email,
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
      console.log(error.response.data.message);
      showToast2(ALERT_TYPE.DANGER, 'Oops..', error.response.data.message);
      // dialogFeedback(
      //   'Success',
      //   error.response.data.message,
      //   true,
      //   ALERT_TYPE.DANGER,
      //   2000,
      //   () => {
      //     resetForm();
      //   },
      // );
      errorFetchWithFeedback(error, navigation.navigate, 2000, null);
    } finally {
      resetForm();
    }
    // navigation.navigate('Intro');
  };

  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        enabled>
        <ScrollView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Text style={styles.headline}>Verifikasi Email</Text>
              <Text style={styles.subHeadline}>
                Masukkan <Text style={styles.boldText}>Kode</Text> yang
                dikirimkan melalui <Text style={styles.boldText}>email</Text>
              </Text>
              <Formik
                validateOnChange={false}
                enableReinitialize
                initialValues={{...formState}}
                validationSchema={emailVerifyValidationSchema}
                onSubmit={onSubmitHandler}>
                {({
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  handleSubmit,
                  resetForm,
                  values,
                  errors,
                  isValid,
                }) => (
                  <Stack space={4} w="100%" maxW="350px" mx="auto">
                    <CustomForm
                      errors={errors.kode_verifikasi_email}
                      handleChange={handleChange('kode_verifikasi_email')}
                      isValid={isValid}
                      values={values.kode_verifikasi_email}
                      keyboardType="numeric"
                      placeholder="Kode Verifikasi"
                      maxLength={6}
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

export default EmailVerification;
