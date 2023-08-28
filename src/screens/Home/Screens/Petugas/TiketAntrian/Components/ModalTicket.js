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
import {dateOnlyConvert} from '../../../../../../utils/functionHelper';
const ModalTicket = ({data, modalVisible, setModalVisible, onCetakHandler}) => {
  let logoFromFile = require('../../../../../../../assets/images/EQ-Puskesmas.png');
  return (
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
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
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
                {data?.poli_tujuan}
              </Text>
              <Text style={{fontSize: 16, color: 'black', fontWeight: '600'}}>
                {dateOnlyConvert(data?.tanggal_periksa)}
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
                Sisa Antrian : {data?.sisa_antrian}
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

              <QRCode
                value={JSON.stringify({
                  data: {
                    id_antrian: data?.id_antrian,
                    status_antrian: data?.status_antrian,
                    status_hadir: data?.status_hadir,
                  },
                })}
                size={150}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  marginTop: 8,
                }}>
                Estimasi dillayani : {data?.waktu_pelayanan}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: 'bold',

                  textAlign: 'center',
                  marginVertical: 8,
                }}>
                Dipanggil dalam {data?.estimasi_waktu_pelayanan} Menit
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',

                alignItems: 'flex-end',
              }}>
              <View />
              <TouchableOpacity
                onPress={onCetakHandler}
                style={{
                  padding: 16,
                  backgroundColor: 'darkgreen',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white'}}>Cetak Tiket</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ModalTicket;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
