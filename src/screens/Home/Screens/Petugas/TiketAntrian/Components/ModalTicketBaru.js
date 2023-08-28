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

const ModalTicketBaru = ({
  modalVisible,
  setModalVisible,
  poliValue,
  formField,
  setPoliValue,
  initialState,
  validationSchema,
  isNew,
  newTicketHandler,
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
                  <Text>Pilih Poli Tujuan</Text>
                  <Select
                    selectedValue={values.id_praktek}
                    minWidth="200"
                    accessibilityLabel="Pilih Poli"
                    placeholder="Pilih Poli"
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: '',
                    }}
                    mt={1}
                    onValueChange={value => {
                      setFieldValue('id_praktek', value);
                    }}>
                    {poliValue
                      .filter(item => item.status_operasional == 1)
                      .map(item => (
                        <Select.Item
                          key={item.id_praktek}
                          label={`${item.kode_poli}-${item.nama_poli}`}
                          value={item.id_praktek}
                        />
                      ))}
                  </Select>
                  {errors.id_praktek && <ErrorForm text={errors.id_praktek} />}
                </FormControl>

                {isNew ? (
                  <>
                    <Text>Pilih Prioritas</Text>
                    <FormControl isInvalid={!isValid}>
                      <Select
                        selectedValue={values.prioritas}
                        minWidth="200"
                        accessibilityLabel="Pilih Prioritas"
                        placeholder="Pilih Prioritas"
                        _selectedItem={{
                          bg: 'teal.600',
                          endIcon: '',
                        }}
                        mt={1}
                        onValueChange={value => {
                          setFieldValue('prioritas', value);
                        }}>
                        <Select.Item label="Biasa" value="0" />
                        <Select.Item label="Darurat/Gawat" value="1" />
                      </Select>
                      {errors.prioritas && (
                        <ErrorForm text={errors.prioritas} />
                      )}
                    </FormControl>
                  </>
                ) : (
                  <></>
                )}
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
export default ModalTicketBaru;

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
