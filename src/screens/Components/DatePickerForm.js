/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

import {Text, Icon, FormControl} from 'native-base';
import ErrorForm from '../../Components/ErrorForm';
const DatePickerForm = ({
  isValid,
  values,
  errors,
  setIsOpenDate,
  isOpenDate,
  setFieldValue,
}) => {
  return (
    <FormControl isInvalid={!isValid}>
      <View style={{marginTop: 10}}>
        <Text style={{marginBottom: 5}}>Tanggal Lahir</Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              alignSelf: 'flex-end',

              width: '100%',
            }}>
            <TouchableOpacity
              style={{zIndex: 90}}
              onPress={() => setIsOpenDate(true)}>
              <View style={{marginLeft: 5}}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      alignSelf: 'flex-end',
                    }}
                    color="muted.400">
                    {values.tanggal_lahir === ''
                      ? 'belum dipilih'
                      : values.tanggal_lahir}
                  </Text>
                  <Icon
                    as={<MaterialIcons name={'date-range'} />}
                    size={8}
                    mr="2"
                    color="green.700"
                  />
                </View>
                <Text
                  style={{
                    borderBottomWidth: 0.2,
                  }}
                  color="muted.300"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {errors.tanggal_lahir && <ErrorForm text={errors.tanggal_lahir} />}
      <DatePickerForm
        modal
        open={isOpenDate}
        date={new Date()}
        mode="date"
        onConfirm={date => {
          setIsOpenDate(false);
          setFieldValue('tanggal_lahir', date.toLocaleDateString('id'));
        }}
        onCancel={() => {
          setIsOpenDate(false);
        }}
      />
    </FormControl>
  );
};
export default DatePickerForm;
