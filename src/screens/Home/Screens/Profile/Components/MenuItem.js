import React from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MenuItem = ({menuName, onPressHandler, isFirst = false}) => {
  return (
    <TouchableOpacity
      onPress={onPressHandler}
      style={
        isFirst
          ? {...styles.itemWrapper, marginBottom: 40}
          : {...styles.itemWrapper, marginBottom: 20}
      }>
      <Text style={styles.menuText}>{menuName}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  itemWrapper: {
    width: '100%',
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
  },
  menuText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
});
export default MenuItem;
