import {
  Input,
  Text,
  Stack,
  Pressable,
  Icon,
  Button,
  ScrollView,
  FormControl,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useHeaderHeight} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {
  errorFetch,
  dialogCallback,
  dialogFeedback,
  errorFetchWithFeedback,
} from '../../../utils/functionHelper';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import {
  Image,
  View,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';
import {Formik} from 'formik';
import * as yup from 'yup';
import {loginUserActionCreator} from '../../../redux/actions/userAction';

import ErrorForm from '../../../Components/ErrorForm';
import {errorType, loginMessage} from '../../../utils/CONSTANT';
import Form from './Components/FormLogin';
import FormLogin from './Components/FormLogin';
const KEYBOARD_VERTICAL_OFFSET = useHeaderHeight + StatusBar.currentHeight;

const Login = props => {
  const deviceWidth = Dimensions.get('window').width;

  const [alertValue, setAlertValue] = useState({
    isOpen: false,
    color: '',
    text: '',
  });
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [formState, setFormState] = useState({
    user_id: '',

    password: '',
  });
  const loginValidationSchema = yup.object().shape({
    user_id: yup
      .string()
      .length(16, ({length}) => `NIK/User ID terdiri dari ${length} karakter`)
      .required('NIK/User ID harus diisi'),

    password: yup
      .string()
      .min(6, ({min}) => `Password  minimal ${min} digit`)

      .required('Password harus diisi'),
  });

  const forgotPasswordNavigation = () => {
    props.navigation.navigate('LupaPassword');
  };

  useEffect(() => {
    if (alertValue.isOpen) {
      dialogCallback(
        'Perhatian',
        alertValue.text,
        true,
        alertValue.color,
        null,
      );
    } else {
      dialogCallback(null, null, false, null);
    }
  }, [alertValue]);

  useEffect(() => {
    // console.log(props.dataUser?.token);
    if (isLogin && props.isFulfilled && props.data?.token?.length > 0) {
      dialogFeedback(
        'Success',
        loginMessage.success,
        true,
        ALERT_TYPE.SUCCESS,
        10000,
        () => {
          console.log(props.isFulfilled);
          props.navigation.navigate('Home');
          setIsLogin(false);
        },
      );

      // return () => {
      //   clearTimeout(timeout);
      // };
    }
  }, [props.isFulfilled, isLogin, props.data]);
  useEffect(() => {
    // console.log(props.dataUser?.token);
    if (isLogin && props.isRejected) {
      dialogFeedback(
        'gaggal',
        loginMessage.success,
        true,
        ALERT_TYPE.SUCCESS,
        10000,
        () => {
          console.log(props.isFulfilled);
          // props.navigation.navigate('Home');
          setIsLogin(false);
        },
      );

      // return () => {
      //   clearTimeout(timeout);
      // };
    }
  }, [props.isRejected, isLogin]);

  const onSubmitHandler = (formData, {resetForm, setFieldValue}) => {
    setIsLogin(true);

    props
      .loginUserAction({
        user_id: formData.user_id,
        password: formData.password,
      })
      .catch(error => {
        if (error.response.data.message === errorType.EMAIL_UNVERIFY) {
          // setIsLoading(false);

          dialogFeedback(
            'Oops..',
            error.response.data.message,
            true,
            ALERT_TYPE.DANGER,
            4000,
            () => {
              console.log('error email');
              props.navigation.navigate('EmailVerify', {
                user_id: formData.user_id,
              });
            },
          );
        } else {
          console.log('error');
          errorFetchWithFeedback(error, props.navigation.navigate, 8000);
        }
      })
      .finally(() => {
        setIsLogin(false);

        setFieldValue('password', '');
      });
  };

  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        enabled>
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Formik
              validateOnChange={false}
              enableReinitialize
              initialValues={{...formState}}
              validationSchema={loginValidationSchema}
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
                <View style={styles.inner}>
                  <ScrollView>
                    <Text style={styles.headline}>Selamat Datang !</Text>
                    <Text style={styles.subHeadline}>
                      Masuk Terlebih Dahulu
                    </Text>

                    <View style={styles.containerImage}>
                      <Image
                        source={require('../../../../assets/images/undraw_Mobile_login_re_9ntv.png')}
                        style={
                          (styles.image,
                          {
                            height: '100%',
                            width: '100%',
                            resizeMode: 'contain',
                          })
                        }
                      />
                    </View>
                    <FormLogin
                      errors={errors}
                      forgotPasswordNavigation={forgotPasswordNavigation}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      isValid={isValid}
                      navigation={props.navigation}
                      setShow={setShow}
                      isLoading={props.isLoading}
                      show={show}
                      values={values}
                    />
                  </ScrollView>
                  <View style={{flex: 1}} />
                </View>
              )}
            </Formik>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </AlertNotificationRoot>
  );
};

const mapStateToProps = ({reducerUser}) => ({
  isRejected: reducerUser.isRejected,
  isFulfilled: reducerUser.isFulfilled,
  isLoading: reducerUser.isLoading,
  data: reducerUser.data,
  message: reducerUser.message,
  error: reducerUser.error,
});
const mapDispatchToProps = dispatch => ({
  loginUserAction: body => dispatch(loginUserActionCreator(body)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
