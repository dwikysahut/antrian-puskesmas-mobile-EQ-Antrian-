import React from 'react';
import {Select} from 'native-base';
import {View} from 'react-native';

const SelectPoli = ({poliValue, onPoliChangeHandler, dataPoli}) => {
  console.log(poliValue);
  return (
    <View>
      <Select
        selectedValue={poliValue}
        minWidth="200"
        accessibilityLabel="Pilih Poli"
        placeholder="Pilih Poli"
        _selectedItem={{
          bg: 'gray',
          endIcon: '',
        }}
        mt={1}
        onValueChange={itemValue => onPoliChangeHandler(itemValue)}>
        {dataPoli.map(item => (
          <Select.Item
            value={item.id_praktek}
            label={item.nama_poli}
            key={item.id_praktek}
          />
        ))}
      </Select>
    </View>
  );
};
export default SelectPoli;
