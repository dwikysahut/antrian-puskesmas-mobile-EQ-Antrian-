import React from 'react';
import {Select} from 'native-base';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ItemAntrian = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <FontAwesome name="ticket" size={70} color="black" />
        </View>
        <View style={styles.columnWrapper}>
          <Text style={{color: 'black', fontSize: 19}}>{data.jenis_poli}</Text>
          <Text
            style={{
              color: 'black',
              fontSize: 22,
              marginTop: 8,
              fontWeight: 'bold',
            }}>
            {data.nomor_antrian}
          </Text>
        </View>
        <View style={[styles.columnWrapper, {alignItems: 'flex-end'}]}>
          <Text style={{color: 'black', fontSize: 15}}>
            {data.tgl_kunjungan}
          </Text>
          <Text
            style={{
              color: 'white',
              borderRadius: 5,
              backgroundColor:
                data.status_kehadiran === 1 ? 'darkgreen' : 'red',
              fontSize: 16,
              padding: 8,
              marginTop: 8,
              fontWeight: 'bold',
            }}>
            {data.status_kehadiran === 1 ? 'Hadir' : 'Belum Hadir'}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text
          style={{color: 'black', fontSize: 18, fontStyle: 'italic', flex: 1}}>
          {data.sumber}
        </Text>

        <Text
          style={{
            color: data.id_status < 4 ? '#CFB53B' : 'darkgreen',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {data.status_antrian}
        </Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.btn, {backgroundColor: 'darkgreen'}]}>
          <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
            Selesai
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: 'darkred', marginStart: 10}]}>
          <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
            Batalkan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    backgroundColor: 'white',
    elevation: 8,
    borderRadius: 5,
    padding: 16,
  },
  firstRow: {
    flexDirection: 'row',
  },
  columnWrapper: {
    flex: 1,
    marginVertical: 4,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 6,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    flex: 1,
  },
});
export default ItemAntrian;
