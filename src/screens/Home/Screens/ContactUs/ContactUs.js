import React from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

import ButtonItem from './Components/ButtonItem';

const ContactUs = ({menuName, isFirst = false}) => {
  const whatsappButtonHandler = () => {
    Linking.openURL('whatsapp://send?text=hello&phone=+6281217890040');
  };
  const telpButtonHandler = () => {
    Linking.openURL('tel:0341718165');
  };
  const emailButtonHandler = () => {
    Linking.openURL('mailto:pkmgribig.mlg@gmail.com');
  };

  const instagramButtonHandler = () => {
    Linking.openURL('instagram://user?username=puskesmasgribig');
  };
  return (
    <View style={styles.itemWrapper}>
      <ButtonItem
        name="Whatsapp"
        icon="whatsapp"
        onClick={whatsappButtonHandler}
      />
      <ButtonItem name="Email" icon="envelope-o" onClick={emailButtonHandler} />
      <ButtonItem
        name="Telepon"
        icon="phone-square"
        onClick={telpButtonHandler}
      />
      <ButtonItem
        name="Instagram"
        icon="instagram"
        onClick={instagramButtonHandler}
      />
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
