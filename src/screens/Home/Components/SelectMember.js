import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {Box, Select, Center} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const SelectMember = ({
  data,
  selectedMember,
  setSelectedMember,
  extended = true,
}) => {
  // const [member, setMember] = React.useState('12321321');
  console.log(data);
  return (
    <Box maxW="100%" mt={2}>
      <Select
        defaultValue=""
        selectedValue={selectedMember.item}
        minWidth="200"
        accessibilityLabel="Pilih Anggota Keluarga"
        placeholder="Pilih Anggota Keluarga"
        _selectedItem={{
          bg: 'gray.300',
          color: 'white',
          endIcon: '',
        }}
        mt={1}
        onValueChange={itemValue =>
          setSelectedMember(prevState => ({...prevState, item: itemValue}))
        }>
        {!extended && (
          <Select.Item
            label={'Belum Dipilih'}
            _disabled={true}
            isDisabled
            isPressed={false}
            _focusVisible={false}
            value=""
          />
        )}
        {extended && <Select.Item label={'Semua'} value="" />}

        {data?.map(item => (
          <Select.Item label={`${item.nik} - ${item.nama}`} value={item.nik} />
        ))}
      </Select>
    </Box>
  );
};
export default SelectMember;
