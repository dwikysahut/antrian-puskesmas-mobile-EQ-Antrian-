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
} from 'native-base';
import React, {useEffect, useState, useRef} from 'react';
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
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';

import CardItem from '../Components/CardItem';
import SelectMember from '../../../Components/SelectMember';
import ModalTicket from '../Components/ModalTicket';
import FabButton from '../../../../../Components/FabButton';
import {color} from '../../../../../utils/Color';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    nama_poli: 'poli umum',
    nomor_antrian: 'A3-14',
    tgl_kunjungan: '20-08-2022',
    id_status: 2,
    status: 'Menunggu Pelayanan Poli',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    nama_poli: 'poli umum',
    nomor_antrian: 'A3-14',
    tgl_kunjungan: '20-08-2022',
    id_status: 1,
    status: 'Terdaftar',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    nama_poli: 'poli umum',
    nomor_antrian: 'A3-14',
    tgl_kunjungan: '20-08-2022',
    id_status: 2,
    status: 'Menunggu Pelayanan Poli',
  },
];
const ActiveAntrian = () => {
  const navigation = useNavigation();
  const listRef = useRef(null);
  const [showGoTopBtn, setShowGoTopBtn] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const setDataDetailHandler = data => {
    setDataDetail(data);
  };
  const onPressFabHandler = ref => {
    listRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
      // eslint-disable-next-line no-sequences
    });
    setShowGoTopBtn(false);
  };

  console.log(modalVisible);
  const renderItem = ({item}) => (
    <CardItem
      data={item}
      isActive={1}
      modalVisible={modalVisible}
      navigation={navigation}
      setModalVisible={setModalVisible}
      setDataDetailHandler={setDataDetailHandler}
    />
  );
  // useEffect(onPressFabHandler);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnPendaftaran}
        onPress={() => navigation.navigate('HomePendaftaran')}>
        <Text style={styles.textBtnWhite}>Buat Pendaftaran Antrian</Text>
      </TouchableOpacity>
      <SelectMember />
      <FlatList
        ref={listRef}
        onScrollEndDrag={() => setShowGoTopBtn(true)}
        style={{marginTop: 10}}
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      {dataDetail !== null ? (
        <ModalTicket
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={dataDetail}
        />
      ) : (
        <></>
      )}
      <FabButton isShow={showGoTopBtn} onPressFabHandler={onPressFabHandler} />
    </View>
  );
};

export default ActiveAntrian;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,

    paddingHorizontal: 16,

    backgroundColor: 'white',
  },
  btnPendaftaran: {
    paddingVertical: 12,
    marginTop: 4,
    paddingHorizontal: 16,

    alignItems: 'center',
    backgroundColor: color.main,
    borderRadius: 5,
  },
  textBtnWhite: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 1.5,
  },
});
