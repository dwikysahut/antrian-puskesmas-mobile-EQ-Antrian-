import {
  Input,
  Text,
  Stack,
  Pressable,
  Icon,
  Button,
  Box,
  TextArea,
  Select,
  FormControl,
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
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import {Formik} from 'formik';
import * as yup from 'yup';
import styles from './style';
import {color} from '../../../utils/Color';
import ErrorForm from '../../../Components/ErrorForm';
import moment from 'moment';
import {registerUser} from '../../../utils/http';
import {
  dialogCallback,
  dialogFeedback,
  errorFetch,
  errorFetchWithFeedback,
  dateOnlyConvert,
} from '../../../utils/functionHelper';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
} from 'react-native-alert-notification';
import LoaderIndicator from '../../../Components/LoaderIndicator';
const Register = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isOpenDate, setIsOpenDate] = useState(false);

  const [formState, setFormState] = useState({
    user_id: '',
    email: '',
    password: '',
    nama_user: '',
    no_telepon: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    no_kk: '',
    kepala_keluarga: '',
  });

  const registerValidationSchema = yup.object().shape({
    user_id: yup
      .string()
      .length(16, ({length}) => `NIK terdiri dari ${length} karakter`)
      .required('NIK harus diisi'),
    nama_user: yup.string().min(1).required('Nama harus diisi'),
    no_telepon: yup
      .string()
      .min(11, ({min}) => `No. Telepon memiliki minimal ${min} digit`)
      .max(14, ({max}) => `No. Telepon memiliki maksimal ${max} digit`)
      .required('No. Telepon harus diisi'),
    email: yup
      .string()
      .email('Masukkan email yang valid')
      .required('Email harus diisi'),
    password: yup
      .string()
      .min(8, ({min}) => `Password  minimal ${min} digit`)

      .required('Password harus diisi'),
    jenis_kelamin: yup
      .string()
      .required('Jenis kelamin harus dipilih')
      .oneOf(['Laki-laki', 'Perempuan'])
      .label('Jenis Kelamin'),
    tanggal_lahir: yup.string().required('Tanggal Lahir harus diisi'),
    no_kk: yup
      .string()
      .length(16, ({length}) => `No. KK terdiri dari ${length} karakter`)
      .required('Nomor Kartu Keluarga harus diisi'),
    kepala_keluarga: yup
      .string()
      .min(1)
      .required('Nama Kepala Keluarga harus diisi'),
  });

  useEffect(() => {});

  const onSubmitHandler = async (formData, {resetForm}) => {
    setIsLoading(true);
    try {
      const response = await registerUser({...formData});
      if (response.status == 201 || response.data.status == 201) {
        dialogFeedback(
          'Success',
          response.data.message,
          true,
          ALERT_TYPE.SUCCESS,
          2000,
          () => {
            resetForm();
            navigation.navigate('EmailVerify', {user_id: formData.user_id});
          },
        );
      }
    } catch (error) {
      errorFetchWithFeedback(error, navigation.navigate, 6000, null);
    } finally {
      setIsLoading(false);

      // setIsLogin(false);
    }
  };
  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Formik
              validateOnChange={false}
              initialValues={{...formState}}
              validationSchema={registerValidationSchema}
              onSubmit={onSubmitHandler}>
              {({
                handleChange,
                setFieldValue,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <View style={styles.inner}>
                  <Text style={styles.headline}>Selamat Datang !</Text>
                  <Text style={styles.subHeadline}>
                    Bergabunglah Bersama Kami
                  </Text>

                  <ScrollView>
                    <Stack space={3} w="100%" maxW="350px" mx="auto">
                      <FormControl isInvalid={!isValid}>
                        <Input
                          variant="underlined"
                          placeholder="NIK"
                          value={values.user_id}
                          keyboardType="numeric"
                          maxLength={16}
                          focusOutlineColor="green.700"
                          onChangeText={handleChange('user_id')}
                        />
                        <Text style={{fontSize: 13, color: 'darkgrey'}}>
                          {values.user_id.length}/16
                        </Text>
                        {errors.user_id && <ErrorForm text={errors.user_id} />}
                      </FormControl>

                      <FormControl isInvalid={!isValid}>
                        <Input
                          variant="underlined"
                          value={values.nama_user}
                          onChangeText={handleChange('nama_user')}
                          placeholder="Nama lengkap"
                          focusOutlineColor="green.700"
                        />
                        {errors.nama_user && (
                          <ErrorForm text={errors.nama_user} />
                        )}
                      </FormControl>
                      <FormControl isInvalid={!isValid}>
                        <Input
                          variant="underlined"
                          placeholder="Email"
                          keyboardType="email-address"
                          focusOutlineColor="green.700"
                          value={values.email}
                          onChangeText={handleChange('email')}
                        />
                        {errors.email && <ErrorForm text={errors.email} />}
                      </FormControl>
                      <FormControl isInvalid={!isValid}>
                        <Input
                          variant="underlined"
                          placeholder="No. Telepon"
                          keyboardType="numeric"
                          value={values.no_telepon}
                          onChangeText={handleChange('no_telepon')}
                          focusOutlineColor="green.700"
                        />
                        {errors.no_telepon && (
                          <ErrorForm text={errors.no_telepon} />
                        )}
                      </FormControl>

                      <FormControl isInvalid={!isValid}>
                        <Input
                          variant="underlined"
                          type={show ? 'text' : 'password'}
                          focusOutlineColor="green.700"
                          value={values.password}
                          onChangeText={handleChange('password')}
                          InputRightElement={
                            <Pressable onPress={() => setShow(!show)}>
                              <Icon
                                as={
                                  <MaterialIcons
                                    name={
                                      show ? 'visibility' : 'visibility-off'
                                    }
                                  />
                                }
                                size={5}
                                mr="2"
                                color="muted.400"
                              />
                            </Pressable>
                          }
                          placeholder="Password"
                        />
                        {errors.password && (
                          <ErrorForm text={errors.password} />
                        )}
                      </FormControl>

                      <FormControl isInvalid={!isValid}>
                        <Input
                          variant="underlined"
                          placeholder="Nomor Kartu Keluarga"
                          keyboardType="numeric"
                          value={values.no_kk}
                          maxLength={16}
                          onChangeText={handleChange('no_kk')}
                          focusOutlineColor="green.700"
                        />
                        <Text style={{fontSize: 13, color: 'darkgrey'}}>
                          {values.no_kk.length}/16
                        </Text>
                        {errors.no_kk && <ErrorForm text={errors.no_kk} />}
                      </FormControl>
                      <FormControl isInvalid={!isValid}>
                        <Input
                          variant="underlined"
                          placeholder="Nama Kepala Keluarga"
                          keyboardType="default"
                          focusOutlineColor="green.700"
                          value={values.kepala_keluarga}
                          onChangeText={handleChange('kepala_keluarga')}
                        />
                        {errors.no_kk && (
                          <ErrorForm text={errors.kepala_keluarga} />
                        )}
                      </FormControl>
                      <FormControl isInvalid={!isValid}>
                        <View style={{marginTop: 10}}>
                          <Text style={{marginBottom: 5}}>Tanggal Lahir</Text>
                          <View style={{flexDirection: 'row'}}>
                            <View
                              style={{
                                alignSelf: 'flex-end',

                                width: '100%',
                              }}>
                              <TouchableOpacity
                                style={{zIndex: 90}}
                                onPress={() => setIsOpenDate(true)}>
                                <View style={{marginLeft: 5}}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      width: '100%',
                                      justifyContent: 'space-between',
                                    }}>
                                    <Text
                                      style={{
                                        marginLeft: 10,
                                        alignSelf: 'flex-end',
                                      }}
                                      color="muted.400">
                                      {values.tanggal_lahir === ''
                                        ? 'belum dipilih'
                                        : dateOnlyConvert(values.tanggal_lahir)}
                                    </Text>
                                    <Icon
                                      as={<MaterialIcons name={'date-range'} />}
                                      size={8}
                                      mr="2"
                                      color="green.700"
                                    />
                                  </View>
                                  <Text
                                    style={{
                                      borderBottomWidth: 0.2,
                                    }}
                                    color="muted.300"
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                        {errors.tanggal_lahir && (
                          <ErrorForm text={errors.tanggal_lahir} />
                        )}
                        <DatePicker
                          modal
                          open={isOpenDate}
                          date={new Date()}
                          mode="date"
                          onConfirm={date => {
                            setIsOpenDate(false);
                            console.log(date);

                            setFieldValue('tanggal_lahir', date);
                          }}
                          onCancel={() => {
                            setIsOpenDate(false);
                          }}
                        />
                      </FormControl>

                      <Box>
                        <FormControl isInvalid={!isValid}>
                          <Select
                            selectedValue={values.jenis_kelamin}
                            accessibilityLabel="Jenis Kelamin"
                            placeholder="Jenis Kelamin"
                            defaultValue="Laki-laki"
                            _selectedItem={{
                              bg: 'gray.200',
                              endIcon: '',
                            }}
                            mt={1}
                            onValueChange={handleChange('jenis_kelamin')}>
                            <Select.Item label="Laki-laki" value="Laki-laki" />
                            <Select.Item label="Perempuan" value="Perempuan" />
                          </Select>
                          {errors.jenis_kelamin && (
                            <ErrorForm text={errors.jenis_kelamin} />
                          )}
                        </FormControl>
                      </Box>
                      {isLoading ? (
                        <LoaderIndicator />
                      ) : (
                        <Button
                          variant="outline"
                          backgroundColor={color.main}
                          // onPress={() => navigation.navigate('EmailVerify')}
                          onPress={handleSubmit}>
                          <Text color="white">Daftar</Text>
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        backgroundColor="white"
                        onPress={() => navigation.navigate('Login')}>
                        <Text color="darkgreen">Kembali</Text>
                      </Button>
                    </Stack>
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

export default Register;
