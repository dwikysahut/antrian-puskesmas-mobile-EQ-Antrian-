import {Header, useHeaderHeight} from '@react-navigation/stack';
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
  StyleSheet,
} from 'react-native';
import SelectMember from '../../../Components/SelectMember';
import FormPendaftaran from '../Components/FormPendaftaran';
import ModalTicket from '../Components/ModalTicket';
import {Formik} from 'formik';
import * as yup from 'yup';

const KEYBOARD_VERTICAL_OFFSET = useHeaderHeight + StatusBar.currentHeight;

const poli = [
  {
    id_praktek: 1,
    id_poli: 1,
    nama_poli: 'Poli Umum',
    status_operasional: 1,
  },
  {
    id_praktek: 2,
    id_poli: 2,
    nama_poli: 'Poli KIA',
    status_operasional: 1,
  },
];

const Pendaftaranlama = () => {
  const [formState, setFormState] = useState({});

  const [tglLahir, setTglLahir] = useState(new Date());
  const [tglKunjungan, setTglKunjungan] = useState(new Date());
  const [isOpenTglKunjungan, setIsOpenTglKunjungan] = useState(false);
  const [isOpenTglLahir, setIsOpenTglLahir] = useState(false);
  const [isShowModalTicket, setShowModalTicket] = useState(false);

  const submitBtnHandler = () => {
    setShowModalTicket(true);
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <SelectMember />
            <ScrollView style={{marginTop: 20}}>
              <FormPendaftaran
                isOpenTglKunjungan={isOpenTglKunjungan}
                isOpenTglLahir={isOpenTglLahir}
                tglLahir={tglLahir}
                tglKunjungan={tglKunjungan}
                setIsOpenTglKunjungan={setIsOpenTglKunjungan}
                setIsOpenTglLahir={setIsOpenTglLahir}
                setTglKunjungan={setTglKunjungan}
                setTglLahir={setTglLahir}
                isNew={false}
                submitBtnHandler={submitBtnHandler}
              />
            </ScrollView>
            <View style={{flex: 1}} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
      <ModalTicket
        modalVisible={isShowModalTicket}
        setModalVisible={setShowModalTicket}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inner: {
    paddingHorizontal: 16,
    paddingVertical: 8,

    flex: 1,
    justifyContent: 'flex-end',
  },
  containerImage: {
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  headline: {
    fontSize: 32,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,

    color: 'black',
    fontFamily: 'JosefinSans-Bold',
  },
  subHeadline: {
    fontSize: 25,
    marginTop: 5,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,

    color: 'lightgrey',
    fontFamily: 'JosefinSans-Bold',
  },
});
export default Pendaftaranlama;
