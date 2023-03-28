import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Carousel from 'react-native-snap-carousel';

const ItemPoli = ({data, onPressItemHandler}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPressItemHandler(data.id_praktek, data.nama_poli)}>
      <View style={styles.centerItem}>
        <Text style={{color: 'black', fontSize: 26, fontWeight: 'bold'}}>
          {data.nama_poli}
        </Text>
      </View>
      <View style={styles.inner}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <FontAwesome name="group" size={50} color="black" />
          <Text
            style={{
              fontSize: 20,
              color: data.total_antrian == data.kuota_booking ? 'red' : 'black',
              marginTop: 4,
            }}>{`${data.total_antrian} / ${data.kuota_booking}`}</Text>
        </View>
        <View style={{flex: 2, alignItems: 'center'}}>
          <Text style={{fontSize: 18, color: 'black'}}>
            No Antrian saat ini
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 8,
            }}>
            {data.antrian_sekarang ? data.antrian_sekarang.nomor_antrian : '-'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginTop: 12,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    backgroundColor: 'white',
    elevation: 8,
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  centerItem: {
    alignItems: 'center',
  },
});

export default ItemPoli;
