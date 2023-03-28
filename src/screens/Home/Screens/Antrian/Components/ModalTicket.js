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
                  {data.nama_poli}
                </Text>
                <Text style={{fontSize: 16, color: 'black', fontWeight: '600'}}>
                  {data.tgl_kunjungan}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  Sisa Antrian : 2
                </Text>
                <Text
                  style={{
                    fontSize: 36,
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {data.nomor_antrian}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    color: data.id_status < 4 ? '#CFB53B' : 'darkgreen',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {data.status}
                </Text>
                {data.id_status < 4 ? (
                  <>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        marginTop: 8,
                      }}>
                      Estimasi dillayani : 11.00
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',
                        fontWeight: 'bold',

                        textAlign: 'center',
                        marginVertical: 8,
                      }}>
                      Dipanggil dalam 24 Menit
                    </Text>
                  </>
                ) : (
                  <>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        marginTop: 8,
                      }}>
                      Waktu Dilayani : 11.00
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',
                        fontWeight: 'bold',

                        textAlign: 'center',
                        marginVertical: 8,
                        marginBottom: 16,
                      }}>
                      Selesai Pelayanan : 11.15
                    </Text>
                  </>
                )}

                <QRCode value={data.id} size={120} />

                {data.id_status < 4 ? (
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'black',
                      fontWeight: '300',
                      textAlign: 'justify',

                      marginTop: 10,
                    }}>
                    * Harap datang 10 menit sebelum dipanggil untuk proses
                    administrasi dan jangan Lupa membawa kartu berobat/KTP/kartu
                    BPJS
                  </Text>
                ) : (
                  <></>
                )}
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
