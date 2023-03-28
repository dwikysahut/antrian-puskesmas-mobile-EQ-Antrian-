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

import ModalTicket from '../Components/ModalTicket';
import SelectMember from '../../../Components/SelectMember';
import FabButton from '../../../../../Components/FabButton';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    nama_poli: 'poli umum',
    nomor_antrian: 'A3-14',
    tgl_kunjungan: '20-08-2022',
    id_status: 4,
    status: 'Selesai',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    nama_poli: 'poli umum',
    nomor_antrian: 'A3-14',
    tgl_kunjungan: '20-08-2022',
    id_status: 5,
    status: 'Dibatalkan',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    nama_poli: 'poli umum',
    nomor_antrian: 'A3-14',
    tgl_kunjungan: '20-08-2022',
    id_status: 5,
    status: 'Menunggu Antrian',
  },
];
const HistoryAntrian = () => {
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
      setModalVisible={setModalVisible}
      setDataDetailHandler={setDataDetailHandler}
    />
  );
  useEffect(() => {});
  return (
    <View style={styles.container}>
      <SelectMember />
      <FlatList
        style={{marginTop: 10}}
        onScrollEndDrag={() => setShowGoTopBtn(true)}
        data={DATA}
        ref={listRef}
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

export default HistoryAntrian;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,

    backgroundColor: 'white',
  },
  btnPendaftaran: {
    paddingVertical: 12,
    marginTop: 8,
    paddingHorizontal: 16,

    alignItems: 'center',
    backgroundColor: 'darkgreen',
    borderRadius: 5,
  },
  textBtnWhite: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 1.5,
  },
});
