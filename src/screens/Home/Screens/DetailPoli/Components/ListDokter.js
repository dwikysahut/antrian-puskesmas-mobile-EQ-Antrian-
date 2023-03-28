import React, {useEffect} from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ScrollView} from 'native-base';

import {roundToNearestPixel} from 'react-native/Libraries/Utilities/PixelRatio';
import ItemDokter from './ItemDokter';

// import Icon from 'react-native-vector-icons/Ionicons';

const ListDokter = ({data}) => {
  return (
    <View style={styles.container}>
      {/* mencari data dokter yang status operasionalnya 1 dan memfilter agar tidak ada duplicate*/}
      {data
        .filter(
          (item, index) =>
            !data
              .map(item => item.id_dokter)
              .includes(item.id_dokter, index + 1),
        )
        .map(item => (
          <ItemDokter data={item} key={item.id_detail_praktek} />
        ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
    margin: 10,
    borderRadius: 10,

    flexWrap: 'wrap',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
});

export default ListDokter;
