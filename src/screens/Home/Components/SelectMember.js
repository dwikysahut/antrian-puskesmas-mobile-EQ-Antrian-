import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {Box, Select, Center} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const SelectMember = ({data, isActive}) => {
  const [member, setMember] = React.useState('12321321');
  return (
    <Box maxW="100%" mt={2}>
      <Select
        selectedValue={member}
        minWidth="200"
        accessibilityLabel="Pilih Anggota Keluarga"
        placeholder="Pilih Anggota Keluarga"
        _selectedItem={{
          bg: 'gray.300',
          color: 'white',
          endIcon: '',
        }}
        mt={1}
        onValueChange={itemValue => setMember(itemValue)}>
        <Select.Item label="Dwiky Satria Hutomo - 12321321" value="12321321" />
        <Select.Item
          label="Dwiky Satria Hutomo - 357303232913210"
          value="357303232913210"
        />
        <Select.Item label="Dwiky Satria Hutomo - 123123" value="123123" />
      </Select>
    </Box>
  );
};
export default SelectMember;
