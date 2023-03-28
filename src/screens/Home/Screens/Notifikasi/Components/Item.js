import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color} from '../../../../../utils/Color';

const Item = ({data}) => {
  console.log(data);
  return (
    <View
      style={
        data.is_opened === 0
          ? [styles.wrapper, {backgroundColor: color.third}]
          : styles.wrapper
      }>
      <Text style={styles.text}>{data.text_notifikasi}</Text>
      {data.jenis_notifikasi === 1 ? (
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              Setuju
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: 'white',
                borderColor: 'darkgreen',
                borderWidth: 1,
              },
            ]}>
            <Text
              style={{color: 'darkgreen', fontWeight: 'bold', fontSize: 16}}>
              Tolak
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      <Text style={{textAlign: 'right', marginTop: 5, fontSize: 12}}>
        {data.date_created}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: color.main,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    padding: 10,
  },
});

export default Item;
