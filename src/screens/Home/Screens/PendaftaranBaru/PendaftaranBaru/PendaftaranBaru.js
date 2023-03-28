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
import {useNavigation} from '@react-navigation/native';

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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ModalTicket from '../Components/ModalTicket';

const KEYBOARD_VERTICAL_OFFSET = useHeaderHeight + StatusBar.currentHeight;

const PendaftaranBaru = ({params}) => {
  const [tglLahir, setTglLahir] = useState(new Date());
  const [tglKunjungan, setTglKunjungan] = useState(new Date());
  const [isOpenTglKunjungan, setIsOpenTglKunjungan] = useState(false);
  const [isOpenTglLahir, setIsOpenTglLahir] = useState(false);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalPicker, setShowModalPicker] = useState(false);
  const [isShowModalTicket, setShowModalTicket] = useState(false);
  const navigation = useNavigation();
  console.log(params);

  const cameraHandler = async () => {
    const options = {
      noData: true,
      skipBackup: true,
      path: 'images',
    };
    launchCamera(options, response => {});
  };
  const galleryHandler = async () => {
    const options = {
      noData: true,
      skipBackup: true,
      path: 'images',
    };
    launchImageLibrary(options, response => {});
  };
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
            {/* <SelectMember /> */}
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
                isNew={true}
                showModalUpload={showModalUpload}
                setShowModalUpload={setShowModalUpload}
                showModalPicker={showModalPicker}
                setShowModalPicker={setShowModalPicker}
                cameraHandler={cameraHandler}
                galleryHandler={galleryHandler}
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
export default PendaftaranBaru;
