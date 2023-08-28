import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModalTicket from './ModalTicket';
import {
  dateOnlyConvert,
  renderStatusAntrianColor,
} from '../../../../../utils/functionHelper';
import {statusAntrian, statusKehadiran} from '../../../../../utils/DATA';
const CardItem = ({
  data,
  isActive,
  onPressDetailHandler,
  setModalVisible,
  navigation,
  batalHandler,
}) => {
  return (
    <TouchableOpacity
      style={styles.containerItem}
      onPress={() => {
        onPressDetailHandler(data);
      }}>
      <View style={styles.inner}>
        <View style={styles.imageWrapper}>
          <FontAwesome name="ticket" color="black" size={60} />
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {data?.nomor_antrian}
          </Text>
        </View>
        <View style={styles.textWrapper}>
          <View style={styles.topTextWrapper}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '600'}}>
              {data?.poli_tujuan}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'black',
                fontWeight: '600',
              }}>
              {dateOnlyConvert(data?.tanggal_periksa)}
            </Text>
          </View>
          <View>
            <Text
              style={{
                width: 200,
                textAlign: 'center',

                color:
                  data?.status_hadir == 1
                    ? 'darkgreen'
                    : data?.status_hadir == 2
                    ? 'darkred'
                    : 'black',
                padding: 3,
                paddingHorizontal: 10,
                borderRadius: 5,

                fontSize: 15,
              }}>
              {statusKehadiran[data?.status_hadir] || '-'}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
            }}>
            <View />
            <Text
              style={{
                width: 200,
                textAlign: 'center',
                color: 'white',
                backgroundColor: renderStatusAntrianColor(data?.status_antrian),
                padding: 3,
                paddingHorizontal: 10,
                borderRadius: 5,

                fontSize: 15,
              }}>
              {statusAntrian[data?.status_antrian - 1]}
            </Text>
          </View>
        </View>
      </View>
      {isActive === 1 &&
      data?.status_antrian >= 4 &&
      data?.status_antrian < 6 ? (
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() =>
            navigation.navigate('Scanner', {
              data: {
                id_antrian: data.id_antrian,
                status_antrian: data.status_antrian,
                status_hadir: data.status_hadir,
                id_praktek: data.id_praktek,
              },
            })
          }>
          <Text style={{color: 'darkgreen'}}>Scan QR Code</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      {isActive === 1 &&
      (data?.status_antrian == 1 || data?.status_antrian == 4) ? (
        <TouchableOpacity
          style={styles.batalBtn}
          onPress={() => batalHandler(data)}>
          <Text style={{color: 'white'}}>Batalkan</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};
export default CardItem;

const styles = StyleSheet.create({
  containerItem: {
    marginTop: 8,

    padding: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    backgroundColor: 'white',
    elevation: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  inner: {
    flexDirection: 'row',
  },
  topTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  textWrapper: {
    padding: 8,
    flex: 2,
  },
  scanBtn: {
    padding: 8,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: 'darkgreen',
  },
  batalBtn: {
    padding: 8,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: 'darkred',
    backgroundColor: 'darkred',
  },
});
