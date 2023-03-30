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
import {Box, FormControl, Select, Stack} from 'native-base';
import {Formik} from 'formik';
import * as yup from 'yup';
import ErrorForm from '../../../../../../Components/ErrorForm';

const ModalScanOption = ({
  modalVisible,
  setModalVisible,
  poliValue,
  formField,
  setPoliValue,
  validationSchema,
  isNew,
  newTicketHandler,
  initialState,
  skipQueueHandler,
  submitBtnHandler,
}) => {
  console.log(poliValue);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <Formik
        enableReinitialize
        validateOnChange={false}
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={submitBtnHandler}>
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          resetForm,
          values,
          errors,
          isValid,
        }) => (
          <View style={styles.centeredView}>
            <View style={styles.modalWrapper}>
              <Stack space={3} w="100%" maxW="350px" mx="auto">
                <FormControl isInvalid={!isValid}>
                  <Text>Pilih Tujuan</Text>
                  <Select
                    selectedValue={values.id_praktek}
                    minWidth="200"
                    accessibilityLabel="Pilih Tujuan"
                    placeholder="Pilih Tujuan"
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: '',
                    }}
                    mt={1}
                    onValueChange={value => {
                      setFieldValue('type', value);
                    }}>
                    <Select.Item
                      value="status_antrian"
                      label="Update Status Antrian"
                    />
                    <Select.Item
                      value="status_hadir"
                      label="Verifikasi Kehadiran"
                    />
                  </Select>
                  {errors.type && <ErrorForm text={errors.type} />}
                </FormControl>

                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 2}} />
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.btnSubmit}>
                    <Text style={styles.textBtn}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                    style={[
                      styles.btnSubmit,
                      {
                        marginStart: 10,
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'darkgreen',
                      },
                    ]}>
                    <Text style={{color: 'darkgreen', textAlign: 'center'}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </Stack>
            </View>
          </View>
        )}
      </Formik>
    </Modal>
  );
};
export default ModalScanOption;

const styles = StyleSheet.create({
  centeredView: {
    positon: 'absolute',

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    flex: 1,
    marginTop: 20,
    backgroundColor: 'darkgreen',
    borderRadius: 5,
  },
  textBtn: {
    color: 'white',
    textAlign: 'center',
  },
});
