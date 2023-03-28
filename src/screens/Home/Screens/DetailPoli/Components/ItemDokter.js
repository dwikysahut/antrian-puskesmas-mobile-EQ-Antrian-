import React, {useEffect} from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ScrollView} from 'native-base';

import {roundToNearestPixel} from 'react-native/Libraries/Utilities/PixelRatio';

// import Icon from 'react-native-vector-icons/Ionicons';

const ItemDokter = ({data}) => {
  return (
    <View style={styles.container}>
      <Fontisto name="doctor" size={25} color="black" />
      <Text style={{marginStart: 5, fontWeight: '500', fontSize: 13}}>
        {data.nama_dokter}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 8,
  },
});

export default ItemDokter;
