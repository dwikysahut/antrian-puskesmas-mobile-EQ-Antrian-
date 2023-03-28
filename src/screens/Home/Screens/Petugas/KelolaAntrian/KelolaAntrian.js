import React, {useState, useRef} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FabButton from '../../../../../Components/FabButton';

import ItemAntrian from './Components/ItemAntrian';
import SelectPoli from './Components/SelectPoli';

const DATA = [
  {
    id: '1223',
    jenis_poli: 'poli umum',
    nomor_antrian: 'A3-10',
    tgl_kunjungan: '22-10-2022',
    status_kehadiran: 1,
    id_status: 2,
    sumber: 'aplikasi (petugas)',
    status_antrian: 'menunggu pelayanan poli',
  },
  {
    id: '12234',
    jenis_poli: 'poli umum',
    nomor_antrian: 'A3-10',
    tgl_kunjungan: '22-10-2022',
    status_kehadiran: 1,
    sumber: 'aplikasi (petugas)',
    status_antrian: 'menunggu pelayanan poli',
    id_status: 2,
  },
  {
    id: '12235',
    jenis_poli: 'poli umum',
    nomor_antrian: 'A3-10',
    tgl_kunjungan: '22-10-2022',
    status_kehadiran: 0,
    sumber: 'aplikasi (petugas)',
    id_status: 5,
    status_antrian: 'selesai',
  },
];
const renderItem = ({item}) => {
  return <ItemAntrian data={item} />;
};
const KelolaAntrian = () => {
  const listRef = useRef(null);

  const [poliValue, setPoliValue] = useState('');
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
      <SelectPoli
        poliValue={poliValue}
        setPoliValue={setPoliValue}
        dataPoli={''}
      />
      <FlatList
        data={DATA}
        ref={listRef}
        renderItem={renderItem}
        onScrollEndDrag={() => setShowGoTopBtn(true)}
        keyExtractor={item => item.id}
      />
      <FabButton isShow={showGoTopBtn} onPressFabHandler={onPressFabHandler} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
});
export default KelolaAntrian;
