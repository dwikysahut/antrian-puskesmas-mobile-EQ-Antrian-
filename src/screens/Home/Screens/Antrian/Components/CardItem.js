import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModalTicket from './ModalTicket';
const CardItem = ({
  data,
  isActive,
  setDataDetailHandler,
  setModalVisible,
  navigation,
}) => {
  return (
    <TouchableOpacity
      style={styles.containerItem}
      onPress={() => {
        setModalVisible(true);
        setDataDetailHandler(data);
      }}>
      <View style={styles.inner}>
        <View style={styles.imageWrapper}>
          <FontAwesome name="ticket" color="black" size={80} />
        </View>
        <View style={styles.textWrapper}>
          <View style={styles.topTextWrapper}>
            <Text style={{fontSize: 19, color: 'black', fontWeight: '600'}}>
              {data.nama_poli}
            </Text>
            <Text style={{fontSize: 15, color: 'black', fontWeight: '600'}}>
              {data.tgl_kunjungan}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {data.nomor_antrian}
          </Text>
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
                backgroundColor: data.id_status < 4 ? '#CFB53B' : 'darkgreen',
                padding: 3,
                paddingHorizontal: 10,
                borderRadius: 5,

                fontSize: 15,
              }}>
              {data.status}
            </Text>
          </View>
        </View>
      </View>
      {isActive === 1 && data.id_status < 4 ? (
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => navigation.navigate('Scanner')}>
          <Text style={{color: 'darkgreen'}}>Scan QR Code</Text>
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
});
