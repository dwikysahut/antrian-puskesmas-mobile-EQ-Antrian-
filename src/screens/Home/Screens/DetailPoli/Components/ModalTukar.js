/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode-svg';
import {Box, Select} from 'native-base';
const ModalTukar = ({
  showModalTukar,
  setShowModalTukar,
  onTextChangeInputHandler,
  onSubmitHandler,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModalTukar}
      onRequestClose={() => {
        setShowModalTukar(!showModalTukar);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalWrapper}>
          <Text> Alasan Penukaran</Text>
          <TextInput
            multiline={true}
            style={{
              borderWidth: 1,
              marginTop: 16,
              padding: 8,

              textAlignVertical: 'top',
            }}
            numberOfLines={8}
            onChangeText={text => onTextChangeInputHandler(text)}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}} />
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={onSubmitHandler}>
              <Text style={{color: 'white'}}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnSubmit,
                {
                  backgroundColor: 'white',
                  borderColor: 'darkgreen',
                  borderWidth: 1,
                },
              ]}
              onPress={() => setShowModalTukar(!showModalTukar)}>
              <Text style={{color: 'darkgreen'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    positon: 'absolute',

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
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
  btnSubmit: {
    padding: 12,
    justifyContent: 'flex-end',
    flex: 1,
    marginStart: 4,
    alignItems: 'center',

    marginTop: 20,
    backgroundColor: 'darkgreen',
    borderRadius: 5,
  },
  textBtn: {
    color: 'white',
    textAlign: 'center',
  },
});
export default ModalTukar;
