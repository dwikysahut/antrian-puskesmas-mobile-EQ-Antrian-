import {View} from 'native-base';
import React from 'react';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {color} from '../../utils/Color';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.emptyText}>Data Kosong</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  emptyText: {fontSize: 16},
});
export default EmptyList;
