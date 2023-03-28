import React, {createRef, useRef, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import FabButton from '../../../../Components/FabButton';
import NotifikasiList from './Components/NotifikasiList';
import {ScrollView} from 'react-native-gesture-handler';
import PermintaanPenukaran from './Components/NotifikasiList';
const DATA = [
  {
    id: 'notif01',
    text_notifikasi: 'notifikasi ini adalah 1',
    jenis_notifikasi: 0,
    date_created: '10-11-2022 20:10',
    is_opened: 0,
  },
  {
    id: 'notif02',

    text_notifikasi:
      'Andi ingin menukarkan nomor antrian miliknya A3-15 dengan milik anda A3-08 ',
    jenis_notifikasi: 1,
    date_created: '10-11-2022 20:10',
    is_opened: 0,
  },
  {
    id: 'notif05',

    text_notifikasi:
      'Andi ingin menukarkan nomor antrian miliknya A3-15 dengan milik anda A3-08 ',
    jenis_notifikasi: 1,
    date_created: '10-11-2022 20:10',
    is_opened: 1,
  },
  {
    id: 'notif03',
    text_notifikasi: "Status Antrian anda 'Sedang Dilayani'",
    jenis_notifikasi: 0,
    date_created: '10-11-2022 20:10',
    is_opened: 1,
  },
];
const Notifikasi = () => {
  let listRef = createRef(null);
  const [showGoTopBtn, setShowGoTopBtn] = useState(false);

  const onPressFabHandler = ref => {
    listRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
      // eslint-disable-next-line no-sequences
    });
    setShowGoTopBtn(false);
  };
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={listRef}
        onScrollEndDrag={() => setShowGoTopBtn(true)}>
        <NotifikasiList data={DATA} key={DATA.key} type={1} />
        <View style={{marginTop: 15}} />

        <NotifikasiList data={DATA} key={DATA.key} type={0} />
      </Animated.ScrollView>
      {/* <FabButton isShow={showGoTopBtn} onPressFabHandler={onPressFabHandler} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Notifikasi;
