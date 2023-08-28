/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode-svg';
import {
  dateOnlyConvert,
  getCalculatedTime,
  getFullDate,
  getFullTime,
  renderStatusAntrianColor,
} from '../../../../../utils/functionHelper';
import {statusAntrian} from '../../../../../utils/DATA';
const ModalTicket = ({data, modalVisible, setModalVisible}) => {
  console.log(data);

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
            <View style={{padding: 15, maxHeight: '100%'}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1}} />
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <FontAwesome name="close" color="black" size={30} />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 10,
                    marginHorizontal: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      flex: 1,
                      color: 'black',
                      fontWeight: '600',
                      fontStyle: 'italic',
                    }}>
                    {data?.id_antrian}
                  </Text>
                  <Text
                    style={{fontSize: 16, color: 'black', fontWeight: '600'}}>
                    {dateOnlyConvert(data?.tanggal_periksa)}
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 22,
                      color: 'black',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {data?.poli_tujuan}
                  </Text>
                  <View />
                  {data.status_antrian < 5 && (
                    <Text
                      style={{
                        fontSize: 17,
                        color: 'black',
                        fontWeight: '600',
                        textAlign: 'center',
                      }}>
                      Sisa Antrian : {data?.sisa_antrian}
                    </Text>
                  )}

                  <Text
                    style={{
                      fontSize: 20,
                      color: renderStatusAntrianColor(data?.status_antrian),
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginBottom: 8,
                    }}>
                    {statusAntrian[data?.status_antrian - 1]}
                  </Text>
                  {data?.status_antrian < 5 ? (
                    <>
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'black',
                          fontWeight: 'bold',
                          width: '100%',
                          fontStyle: 'italic',
                          textAlign: 'center',
                        }}>
                        Estimasi dilayani : &#177;{'  '}
                        {/* {getCalculatedTime(
                          data?.estimasi_waktu_pelayanan,
                          true,
                        )}{' '} */}
                        {data?.waktu_pelayanan
                          ?.slice(0, -3)
                          .split(':')
                          .join('.') || '-'}{' '}
                        {/* {data.estimasi_waktu_pelayanan} */}
                        WIB
                      </Text>
                      {new Date(data?.tanggal_periksa).toLocaleDateString(
                        'id',
                      ) ==
                        new Date(getFullDate(null)).toLocaleDateString('id') &&
                      getFullTime() > '08:00:00' ? (
                        <Text
                          style={{
                            fontSize: 18,
                            color: 'black',
                            fontWeight: 'bold',

                            textAlign: 'center',
                            marginVertical: 8,
                          }}>
                          Dipanggil dalam &#177;{' '}
                          {data?.estimasi_waktu_pelayanan} Menit
                        </Text>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : data?.status_antrian == 6 ? (
                    <>
                      <Text
                        style={{
                          fontSize: 18,
                          width: '100%',
                          color: 'black',
                          fontWeight: 'bold',
                          fontStyle: 'italic',
                          textAlign: 'center',
                          marginTop: 8,
                        }}>
                        Waktu Dilayani Poli :{' '}
                        {data?.waktu_pelayanan
                          ?.slice(0, -3)
                          .split(':')
                          .join('.') || '-'}{' '}
                        WIB
                      </Text>
                    </>
                  ) : (
                    <></>
                  )}

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
                  {data?.status_antrian <= 5 ? (
                    <QRCode
                      value={JSON.stringify({
                        data: {
                          id_antrian: data.id_antrian,
                          status_antrian: data.status_antrian,
                          status_hadir: data.status_hadir,
                        },
                      })}
                      size={120}
                    />
                  ) : (
                    <></>
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
                  {data?.status_antrian < 4 ? (
                    <Text
                      style={{
                        fontSize: 13,
                        color: 'black',
                        fontWeight: '300',
                        textAlign: 'justify',

                        marginTop: 10,
                      }}>
                      * Harap datang 10 menit sebelum dipanggil untuk proses
                      administrasi dan jangan Lupa membawa kartu
                      berobat/KTP/kartu BPJS
                    </Text>
                  ) : (
                    <></>
                  )}
                </View>
              </ScrollView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: '95%',

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
