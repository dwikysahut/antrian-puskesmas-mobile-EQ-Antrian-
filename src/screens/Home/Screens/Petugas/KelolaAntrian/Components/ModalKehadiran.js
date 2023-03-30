/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Select} from 'native-base';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {dateOnlyConvert} from '../../../../../../utils/functionHelper';
import {statusAntrian} from '../../../../../../utils/DATA';
const ModalKehadiran = ({data, handler, isShow, setIsShow}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShow}
      onRequestClose={() => {
        setIsShow(!isShow);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalWrapper}>
          <View style={styles.headerComponent}>
            <AntDesign
              onPress={() => setIsShow(!isShow)}
              name="close"
              size={40}
            />
          </View>
          <View style={styles.bodyComponent}>
            <Text style={styles.title}>Konfirmasi Kehadiran</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.btn, {backgroundColor: 'darkgreen'}]}
                onPress={() => handler(data, 1)}>
                <Text
                  style={{fontSize: 15, color: 'white', textAlign: 'center'}}>
                  Hadir
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btn,
                  {backgroundColor: 'darkred', marginStart: 10},
                ]}
                onPress={() => handler(data, 2)}>
                <Text
                  style={{fontSize: 15, color: 'white', textAlign: 'center'}}>
                  Tidak Hadir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalWrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    width: '85%',
    height: '30%',

    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  bodyComponent: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    flex: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerComponent: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
  },
});
export default ModalKehadiran;
