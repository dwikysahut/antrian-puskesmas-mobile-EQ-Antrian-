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
                Poli Umum
              </Text>
              <Text style={{fontSize: 16, color: 'black', fontWeight: '600'}}>
                22-10-2022
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
                A2-13
              </Text>

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
                style={{
                  padding: 16,
                  backgroundColor: 'darkgreen',
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white'}}>Submit</Text>
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
