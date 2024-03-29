/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Select} from 'native-base';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  dateOnlyConvert,
  renderStatusAntrianColor,
} from '../../../../../../utils/functionHelper';
import {statusAntrian} from '../../../../../../utils/DATA';
import {color} from '../../../../../../utils/Color';
const ItemAntrian = ({
  data,
  onClickShowStatusModal,
  onClickShowKehadiranModal,
  handlerStatus,
  onClickPanggilHandler,
  handlerKehadiran,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <FontAwesome name="ticket" size={70} color="black" />
        </View>
        <View style={styles.columnWrapper}>
          <Text style={{color: 'black', fontSize: 19}}>{data.poli_tujuan}</Text>
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
            {dateOnlyConvert(data.tanggal_periksa)}
          </Text>
          <Text
            style={{
              color: data.status_hadir == 0 ? 'black' : 'white',
              borderRadius: 5,
              backgroundColor:
                data.status_hadir === 1
                  ? 'darkgreen'
                  : data.status_hadir == 2
                  ? 'red'
                  : 'white',
              fontSize: 16,
              padding: 8,

              marginTop: 8,
              fontWeight: 'bold',
            }}>
            {data.status_hadir === 1
              ? 'Hadir'
              : data.status_hadir === 2
              ? 'Tidak Hadir'
              : 'Belum Hadir'}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text
          style={{color: 'black', fontSize: 13, fontStyle: 'italic', flex: 1}}>
          {data.sumber}
        </Text>

        <Text
          style={{
            color: renderStatusAntrianColor(data.status_antrian),
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          {statusAntrian[parseInt(data.status_antrian, 10) - 1]}
        </Text>
      </View>
      {data.status_hadir == 0 ? (
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => onClickShowKehadiranModal(data)}
            style={[
              styles.btnAksi,
              {
                backgroundColor: 'white',
                borderColor: color.main,
                borderWidth: 1,
              },
            ]}>
            <Text
              style={{fontSize: 15, color: color.main, textAlign: 'center'}}>
              Verifikasi Kehadiran
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {data.status_antrian >= 4 &&
      data.status_antrian < 6 &&
      parseInt(data.status_hadir, 10) === 1 ? (
        <View style={styles.col}>
          <TouchableOpacity
            onPress={() => onClickShowStatusModal(data)}
            style={[styles.btnAksi, {backgroundColor: color.main}]}>
            <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
              Ubah Status Antrian
            </Text>
          </TouchableOpacity>
          {parseInt(data.status_antrian) < 5 && (
            <>
              <TouchableOpacity
                onPress={() => onClickPanggilHandler(data)}
                style={[styles.btnAksi, {backgroundColor: 'black'}]}>
                <Text
                  style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
                  Panggil
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : (
        <></>
      )}
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
  col: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',

    flex: 1,
    marginTop: 10,
    paddingHorizontal: 6,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    flex: 1,
  },
  btnAksi: {
    paddingVertical: 8,
    marginVertical: 3,
    paddingHorizontal: 16,
    borderRadius: 5,
    flex: 1,
    width: '100%',
  },
});
export default ItemAntrian;
