import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color} from '../../../../../utils/Color';
import {statusAntrian, statusKehadiran} from '../../../../../utils/DATA';
import {dateConvert} from '../../../../../utils/functionHelper';

const Shimmer = ({data}) => {
  return (
    <View style={styles.wrapper}>
      {/* jenis notifikasi 0 untuk status kehadiran, 1 untuk status antrian dan 2 untuk request penukaran */}

      <Text style={styles.text}> </Text>

      <Text
        style={{
          textAlign: 'right',
          marginTop: 5,
          fontSize: 12,
          backgroundColor: 'darkgrey',
        }}
      />
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
    backgroundColor: 'darkgrey',
    fontWeight: '500',
    padding: 10,
    lineHeight: 25,
  },
});

export default Shimmer;
