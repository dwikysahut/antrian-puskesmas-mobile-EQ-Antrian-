import React, {useEffect} from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {ScrollView} from 'native-base';

import {roundToNearestPixel} from 'react-native/Libraries/Utilities/PixelRatio';
import {color} from '../../../../../utils/Color';
import {getFullDate} from '../../../../../utils/functionHelper';

// import Icon from 'react-native-vector-icons/Ionicons';

const ItemAntrian = ({
  data,
  index,
  onClickBtnHandler,
  dataUser,
  dataAntrianByCurrentUser,
  selectedAntrianAsal,
  isFirst,
}) => {
  console.log(selectedAntrianAsal);
  const renderButtonAjukan = () => {
    if (
      selectedAntrianAsal !== null &&
      selectedAntrianAsal?.request_tukar == 1 &&
      selectedAntrianAsal?.id_antrian !== data.id_antrian &&
      selectedAntrianAsal?.user_id !== data.user_id &&
      data.prioritas < 1 &&
      data.status_antrian < 5
    ) {
      console.log('ada');
      //saat antrian user merupakan antrian yang selanjutnya akan dilayani maka
      //yang bisa diajukan tukar adalah pasien yang statusnya hadir
      if (
        getFullDate(null) == getFullDate(selectedAntrianAsal.tanggal_periksa)
      ) {
        if (isFirst) {
          console.log(data.id_antrian);
          if (data.status_hadir == 1) {
            console.log('masuk index 2');
            return (
              <TouchableOpacity
                style={styles.btnTukar}
                onPress={() => onClickBtnHandler(data)}>
                <Text
                  style={{
                    color: color.main,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Ajukan Tukar
                </Text>
              </TouchableOpacity>
            );
          }
        } else if (data.prioritas < 1) {
          //saat urutan antrian diatas antrian user pendaftar maka muncul tukar
          if (data.sumber == 'Mobile-Pasien') {
            if (index > 0) {
              return (
                <TouchableOpacity
                  style={styles.btnTukar}
                  onPress={() => onClickBtnHandler(data)}>
                  <Text
                    style={{
                      color: color.main,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Ajukan Tukar
                  </Text>
                </TouchableOpacity>
              );
            }
            //apabila ingin menukar dengan yang akan dilayani, status antrian penukar harus hadir dahulu
            else if (index == 0 && selectedAntrianAsal.status_hadir == 1) {
              return (
                <TouchableOpacity
                  style={styles.btnTukar}
                  onPress={() => onClickBtnHandler(data)}>
                  <Text
                    style={{
                      color: color.main,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    Ajukan Tukar
                  </Text>
                </TouchableOpacity>
              );
            }
          }
          //tidak boleh menukar dengan antrian atasnya yang didaftarkan selain mobile-pasien(pasien bukan pengguna aplikasi)
          //boleh menukar dengan pemilik tiket fisik(didaftarkan petugas) asalkan urutan setelahnya
          else if (
            data.sumber !== 'Mobile-Pasien' &&
            data.status_hadir == 1 &&
            data.urutan > selectedAntrianAsal?.urutan
          ) {
            console.log('ketiga');
            return (
              <TouchableOpacity
                style={styles.btnTukar}
                onPress={() => onClickBtnHandler(data)}>
                <Text
                  style={{
                    color: color.main,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Ajukan Tukar
                </Text>
              </TouchableOpacity>
            );
          } else if (data.sumber === 'Mobile-Pasien') {
            console.log('ketiga');
            return (
              <TouchableOpacity
                style={styles.btnTukar}
                onPress={() => onClickBtnHandler(data)}>
                <Text
                  style={{
                    color: color.main,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Ajukan Tukar
                </Text>
              </TouchableOpacity>
            );
          }
        }
      } else {
        if (data.sumber == 'Mobile-Pasien') {
          console.log('ketiga');
          return (
            <TouchableOpacity
              style={styles.btnTukar}
              onPress={() => onClickBtnHandler(data)}>
              <Text
                style={{
                  color: color.main,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Ajukan Tukar
              </Text>
            </TouchableOpacity>
          );
        }
      }
    }
  };
  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: 1,
          borderColor:
            data.user_id == dataUser.data.user_id ? 'green' : 'white',
        },
      ]}>
      <View style={{alignItems: 'center', flex: 1}}>
        <Ionicons name="person" size={30} color="black" style={{flex: 0.5}} />
        <Text style={{color: 'black'}}>{data.urutan}</Text>
      </View>
      <View style={{flex: 2}}>
        <Text style={{fontWeight: '500', fontSize: 14, color: 'black'}}>
          No. Antrian :{' '}
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            {data.nomor_antrian}
          </Text>
        </Text>
        <Text style={{marginTop: 8, color: 'black'}}>{data.sumber}</Text>
      </View>
      <View style={{flex: 1.5}}>{renderButtonAjukan()}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  btnTukar: {
    backgroundColor: color.third,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default ItemAntrian;
