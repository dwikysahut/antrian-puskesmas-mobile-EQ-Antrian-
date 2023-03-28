import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Item from './Item';

const NotifikasiList = ({data, key, type}) => {
  return (
    <View style={styles.wrapper} key={key}>
      {type == 1 ? (
        <>
          <Text style={styles.title}>Permintaan Penukaran</Text>
          {data
            .filter(item => item.jenis_notifikasi === 1)
            .map(item => (
              <Item data={item} key={item.id} />
            ))}
        </>
      ) : (
        <>
          <Text style={styles.title}>Notifikasi</Text>
          {data
            .filter(item => item.jenis_notifikasi === 0)
            .map(item => (
              <Item data={item} key={item.id} />
            ))}
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {},
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: '900',
    padding: 10,
  },
});

export default NotifikasiList;
