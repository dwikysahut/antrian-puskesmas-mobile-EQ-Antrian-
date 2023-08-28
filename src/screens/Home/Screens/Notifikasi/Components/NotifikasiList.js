import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Item from './Item';
import Shimmer from './Shimmer';

const NotifikasiList = ({
  data,
  type,
  isLoading,

  onClickHandler,
  onClickAksiHandler,
}) => {
  const renderNotifikasiList = () => {
    if (type == 'notifikasi') {
      return (
        <>
          <Text style={styles.title}>Notifikasi</Text>
          {isLoading ? (
            [...Array(4)].map((item, index) => <Shimmer key={index} />)
          ) : data.length > 0 ? (
            data.map(item => (
              <Item
                data={item}
                key={item.id_notifikasi}
                onClickHandler={onClickHandler}
              />
            ))
          ) : (
            <Text style={{textAlign: 'center', color: 'black'}}>
              Tidak ada notifikasi
            </Text>
          )}
        </>
      );
    }
    if (type == 'request') {
      return (
        <>
          <Text style={styles.title}>Permintaan Penukaran</Text>
          {isLoading ? (
            [...Array(1)].map((item, index) => <Shimmer key={index} />)
          ) : data.length > 0 ? (
            data.map(item => (
              <Item
                data={item}
                onClickAksiHandler={onClickAksiHandler}
                key={item.id_notifikasi}
                onClickHandler={onClickHandler}
              />
            ))
          ) : (
            <Text style={{textAlign: 'center', color: 'black'}}>
              Tidak ada permintaan
            </Text>
          )}
        </>
      );
    }
  };
  return <View style={styles.wrapper}>{renderNotifikasiList()}</View>;
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
