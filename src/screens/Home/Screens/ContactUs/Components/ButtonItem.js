import React from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ButtonItem = ({name, icon, onClick}) => {
  return (
    <TouchableOpacity style={styles.itemWrapper} onPress={onClick}>
      <Text style={styles.menuText}>{name}</Text>
      <FontAwesome name={icon} size={30} color="green" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  itemWrapper: {
    width: 200,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  menuText: {
    fontSize: 18,
    flex: 1,
    color: '#004E00',
    textAlign: 'center',
    fontWeight: '600',
  },
});
export default ButtonItem;
