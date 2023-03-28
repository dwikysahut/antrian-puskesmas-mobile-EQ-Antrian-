import React from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import ButtonItem from './Components/ButtonItem';

const ContactUs = ({menuName, isFirst = false}) => {
  return (
    <View style={styles.itemWrapper}>
      <ButtonItem name="Whatsapp" icon="whatsapp" />
      <ButtonItem name="Email" icon="envelope-o" />
      <ButtonItem name="Telepon" icon="phone-square" />
      <ButtonItem name="Instagram" icon="instagram" />
    </View>
  );
};
const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  menuText: {
    fontSize: 18,
    color: '#004E00',
    fontWeight: '600',
  },
});
export default ContactUs;
