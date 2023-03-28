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
import ItemAntrian from './ItemAntrian';
import ShimmerItemAntrian from './ShimmerItemAntrian';

// import Icon from 'react-native-vector-icons/Ionicons';

const ListAntrian = ({isLoading, data, onClickBtnHandler}) => {
  return (
    <View style={styles.container}>
      {isLoading
        ? [...Array(3).keys()].map(item => <ShimmerItemAntrian />)
        : data
            .filter(item => item.status_antrian < 6)
            .map(item => (
              <ItemAntrian
                data={item}
                key={item.id_antrian}
                onClickBtnHandler={onClickBtnHandler}
              />
            ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
    margin: 10,
    marginBottom: 80,
    borderRadius: 10,
  },
});

export default ListAntrian;
