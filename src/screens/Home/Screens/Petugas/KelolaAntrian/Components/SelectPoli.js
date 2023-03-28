import React from 'react';
import {Select} from 'native-base';
import {View} from 'react-native';

const SelectPoli = ({poliValue, setPoliValue, dataPoli}) => {
  return (
    <View>
      <Select
        selectedValue={poliValue}
        minWidth="200"
        accessibilityLabel="Pilih Poli"
        placeholder="Pilih Poli"
        _selectedItem={{
          bg: 'teal.600',
          endIcon: '',
        }}
        mt={1}
        onValueChange={itemValue => setPoliValue(itemValue)}>
        <Select.Item label="Poli Umum" value="ux" />
        <Select.Item label="Poli Lansia" value="web" />
        <Select.Item label="Poli KIA" value="cross" />
      </Select>
    </View>
  );
};
export default SelectPoli;
