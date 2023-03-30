/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import {StyleSheet} from 'react-native';
import WavyBackground from 'react-native-wavy-background';
import {color} from '../../../../../utils/Color';
import ErrorForm from '../../../../../Components/ErrorForm';
import {dateOnlyConvert} from '../../../../../utils/functionHelper';
import LoaderIndicator from '../../../../../Components/LoaderIndicator';
const FormProfile = ({
  show,
  setShow,
  date,
  setDate,
  setIsOpenDate,
  isValid,
  errors,
  values,
  handleChange,
  handleSubmit,
  setFieldValue,
  isOpenDate,
  isLoading,
}) => {
  console.log(typeof values.tanggal_lahir);
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        {/* <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform: [{rotateY: '180deg'}],

            zIndex: 0,
          }}>
          <WavyBackground
            height={80}
            width={20}
            amplitude={5}
            frequency={30}
            offset={60}
            color="#004E00"
          />
        </View> */}

        <View
          style={{
            backgroundColor: 'white',
            zIndex: 3,
            borderRadius: 100,
            borderWidth: 0.7,
            borderColor: '#004E00',
            top: 30,
            height: 150,
            width: 150,
            justifyContent: 'center',
            alignItems: 'center',

            position: 'absolute',
          }}>
          <MaterialCommunityIcons
            name={
              values.jenis_kelamin == 'Perempuan' ? 'face-woman' : 'face-man'
            }
            size={120}
            color="black"
          />
          {/* <Image
            source={require('../../../../../../assets/images/profile/men.png')}
            style={
              (styles.image,
              {height: '100%', width: '100%', resizeMode: 'contain'})
            }
          /> */}
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={{height: 40}} />
            <ScrollView>
              <Stack space={3} w="100%" maxW="350px" mx="auto">
                <FormControl isInvalid={!isValid}>
                  <Input
                    variant="underlined"
                    placeholder="User ID"
                    keyboardType="numeric"
                    _disabled="true"
                    isDisabled="true"
                    editable={false}
                    onChangeText={handleChange('user_id')}
                    selectTextOnFocus={false}
                    value={values.user_id}
                    InputLeftElement={
                      <Icon
                        as={<FontAwesome name="id-card-o" />}
                        size={6}
                        mr="2"
                        textAlign="center"
                        color="green.700"
                      />
                    }
                    focusOutlineColor="green.700"
                  />
                  <Text style={{fontSize: 13, color: 'darkgrey'}}>
                    {values.user_id?.length > 0 ? values.user_id.length : 0}/16
                  </Text>
                  {errors.user_id && <ErrorForm text={errors.user_id} />}
                </FormControl>
                <FormControl isInvalid={!isValid}>
                  <Input
                    variant="underlined"
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    isDisabled
                    InputLeftElement={
                      <Icon
                        as={<AntDesign name="mail" />}
                        size={6}
                        mr="2"
                        color="green.700"
                      />
                    }
                    focusOutlineColor="green.700"
                  />

                  {errors.email && <ErrorForm text={errors.email} />}
                </FormControl>

                <FormControl isInvalid={!isValid}>
                  <Input
                    variant="underlined"
                    placeholder="Nama lengkap"
                    value={values.nama_user}
                    onChangeText={handleChange('nama_user')}
                    InputLeftElement={
                      <Icon
                        as={<Ionicons name="person" />}
                        size={6}
                        mr="2"
                        color="green.700"
                      />
                    }
                    focusOutlineColor="green.700"
                  />
                  {errors.nama_user && <ErrorForm text={errors.nama_user} />}
                </FormControl>
                <FormControl isInvalid={!isValid}>
                  <Input
                    variant="underlined"
                    placeholder="No. Telepon"
                    keyboardType="number-pad"
                    value={values.no_telepon}
                    onChangeText={handleChange('no_telepon')}
                    InputLeftElement={
                      <Icon
                        as={<AntDesign name="mobile1" />}
                        size={6}
                        mr="2"
                        color="green.700"
                      />
                    }
                    focusOutlineColor="green.700"
                  />
                  {errors.no_telepon && <ErrorForm text={errors.no_telepon} />}
                </FormControl>

                <FormControl isInvalid={!isValid}>
                  <Input
                    variant="underlined"
                    type={show ? 'text' : 'password'}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    InputLeftElement={
                      <Icon
                        as={<FontAwesome name="unlock-alt" />}
                        size={6}
                        mr="2"
                        textAlign="center"
                        color="green.700"
                      />
                    }
                    focusOutlineColor="green.700"
                    InputRightElement={
                      <Pressable onPress={() => setShow(!show)}>
                        <Icon
                          as={
                            <MaterialIcons
                              name={show ? 'visibility' : 'visibility-off'}
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
                  <Text style={{color: 'brown', fontSize: 12}}>
                    *
                    <Text
                      style={{
                        color: 'brown',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}>
                      Password
                    </Text>{' '}
                    diisi jika ingin merubah password
                  </Text>
                  {errors.password && <ErrorForm text={errors.password} />}
                </FormControl>

                <FormControl isInvalid={!isValid}>
                  <Text>Nomor Kartu Keluarga</Text>
                  <Input
                    variant="underlined"
                    placeholder="Nomor Kartu Keluarga"
                    keyboardType="numeric"
                    _disabled="true"
                    isDisabled="true"
                    onChangeText={handleChange('no_kk')}
                    editable={false}
                    selectTextOnFocus={false}
                    value={values.no_kk}
                    InputLeftElement={
                      <Icon
                        as={<AntDesign name="idcard" />}
                        size={6}
                        mr="2"
                        color="green.700"
                      />
                    }
                    focusOutlineColor="green.700"
                  />
                  <Text style={{fontSize: 13, color: 'darkgrey'}}>
                    {values.no_kk?.length > 0 ? values.no_kk.length : 0}/16
                  </Text>
                  {errors.no_kk && <ErrorForm text={errors.no_kk} />}
                </FormControl>
                <FormControl isInvalid={!isValid}>
                  <View style={{marginTop: 10}}>
                    <Text style={{marginBottom: 1}}>Nama Kepala Keluarga</Text>
                    <Input
                      variant="underlined"
                      placeholder="Nama Kepala Keluarga"
                      keyboardType="numeric"
                      onChangeText={handleChange('kepala_keluarga')}
                      value={values.kepala_keluarga}
                      InputLeftElement={
                        <Icon
                          as={
                            <MaterialCommunityIcons name="face-man-outline" />
                          }
                          size={6}
                          mr="2"
                          color="green.700"
                        />
                      }
                      focusOutlineColor="green.700"
                    />
                  </View>
                  {errors.kepala_keluarga && (
                    <ErrorForm text={errors.kepala_keluarga} />
                  )}
                </FormControl>
                <View style={{marginTop: 10}}>
                  <Text style={{marginBottom: 5}}>Tanggal Lahir</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      as={<FontAwesome name="birthday-cake" />}
                      size={6}
                      mr="2"
                      color="green.700"
                    />

                    <View
                      style={{
                        alignSelf: 'flex-end',
                        flex: 1,
                      }}>
                      {/* //date */}
                      <TouchableOpacity onPress={() => setIsOpenDate(true)}>
                        <View style={{marginLeft: 5}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={{
                                marginBottom: 10,
                                marginLeft: 10,
                                alignSelf: 'flex-start',
                              }}
                              color="muted.400">
                              {new Date(values.tanggal_lahir).toDateString() ===
                              new Date().toDateString()
                                ? 'belum dipilih'
                                : dateOnlyConvert(values.tanggal_lahir)}
                              {/* values.tanggal_lahir} */}
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
                              position: 'absolute',
                              marginTop: 15,
                            }}
                            color="muted.300">
                            ____________________________________________
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <FormControl isInvalid={!isValid}>
                  <Text>Jenis Kelamin</Text>
                  <Select
                    selectedValue={values.jenis_kelamin}
                    accessibilityLabel="Jenis Kelamin"
                    placeholder="Jenis Kelamin"
                    _selectedItem={{
                      bg: 'gray.200',
                      color: 'text.200',
                      endIcon: '',
                    }}
                    mt={1}
                    onValueChange={itemValue =>
                      setFieldValue('jenis_kelamin', itemValue)
                    }>
                    <Select.Item label="Laki-laki" value="Laki-laki" />
                    <Select.Item label="Perempuan" value="Perempuan" />
                  </Select>

                  {errors.jenis_kelamin && (
                    <ErrorForm text={errors.jenis_kelamin} />
                  )}
                </FormControl>
                {isLoading ? (
                  <LoaderIndicator />
                ) : (
                  <Button
                    variant="outline"
                    backgroundColor={color.main}
                    onPress={handleSubmit}>
                    <Text color="white">Simpan</Text>
                  </Button>
                )}

                <Button
                  variant="outline"
                  backgroundColor="white"
                  color={color.main}
                  onPress={() => navigation.goBack()}>
                  <Text color="darkgreen">Kembali</Text>
                </Button>
              </Stack>
            </ScrollView>
            <View style={{flex: 1}} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
      <DatePicker
        modal
        open={isOpenDate}
        date={
          values?.tanggal_lahir ? new Date(values?.tanggal_lahir) : new Date()
        }
        mode="date"
        onConfirm={dateValue => {
          setIsOpenDate(false);

          setFieldValue('tanggal_lahir', dateValue);
        }}
        onCancel={() => {
          setIsOpenDate(false);
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.main,
    alignItems: 'center',
  },
  inner: {
    padding: 30,
    zIndex: 2,
    marginTop: 110,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },

  headline: {
    fontSize: 32,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,
    color: 'black',
    fontFamily: 'JosefinSans-Bold',
  },
});

export default FormProfile;
