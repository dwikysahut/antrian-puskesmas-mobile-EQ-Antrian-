import React from 'react';
import {color} from '../utils/Color';

import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Modal} from 'react-native';
const LoaderModal = ({modalVisible, setModalVisible}) => {
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
          <View style={styles.centerItem}>
            <ActivityIndicator size="large" color={color.main} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default LoaderModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalWrapper: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    width: '20%',
    height: '10%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 1.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  centerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
