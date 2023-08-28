/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode-svg';
import {statusAntrian} from '../../../../../utils/DATA';
import {dateOnlyConvert} from '../../../../../utils/functionHelper';
const ModalTicket = ({data, modalVisible, setModalVisible}) => {
  console.log(modalVisible);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalWrapper}>
            <View style={{padding: 15}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1}} />
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <FontAwesome name="close" color="black" size={30} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 10,
                  marginHorizontal: 15,
                }}>
                <Text style={{fontSize: 19, color: 'black', fontWeight: '600'}}>
                  {data?.id_antrian}
                </Text>
                <Text style={{fontSize: 16, color: 'black', fontWeight: '600'}}>
                  {dateOnlyConvert(data?.tanggal_periksa)}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 22,

                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {data?.nama_poli}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    color: data?.id_status < 4 ? '#CFB53B' : 'darkgreen',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 8,
                  }}>
                  {statusAntrian[data?.status_antrian - 1]}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 8,
                  }}>
                  Estimasi dilayani dalam &#177;{' '}
                  {data?.estimasi_waktu_pelayanan} Menit
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderStyle: 'dashed',
                    width: '100%',
                    borderBottomWidth: 2,
                    marginBottom: 4,
                  }}
                />

                <Text
                  style={{
                    fontSize: 24,
                    color: 'black',

                    textAlign: 'center',
                  }}>
                  No. Antrian
                </Text>
                <Text
                  style={{
                    fontSize: 36,
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 8,
                  }}>
                  {data?.nomor_antrian}
                </Text>
                {data?.jenis_notifikasi == 2 && data?.aksi == 0 ? (
                  <></>
                ) : (
                  <QRCode value={data?.id_antrian} size={120} />
                )}

                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderStyle: 'dashed',
                    width: '100%',

                    borderBottomWidth: 2,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalTicket;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    width: '85%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});
