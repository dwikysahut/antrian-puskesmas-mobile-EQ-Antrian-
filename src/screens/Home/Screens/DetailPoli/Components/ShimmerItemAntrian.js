import React, {useEffect} from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {ScrollView} from 'native-base';

import {roundToNearestPixel} from 'react-native/Libraries/Utilities/PixelRatio';
import {color} from '../../../../../utils/Color';

// import Icon from 'react-native-vector-icons/Ionicons';

const ShimmerItemAntrian = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="person" size={30} color="black" style={{flex: 0.5}} />
      <View style={{flex: 2}}>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 14,
            flex: 1,
            backgroundColor: 'lightgrey',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              flex: 1,
              backgroundColor: 'lightgrey',
            }}
          />
        </Text>
        <Text style={{marginTop: 8, flex: 1, backgroundColor: 'lightgrey'}} />
      </View>
      <View style={{flex: 1.5}}>
        <></>
      </View>
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
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  btnTukar: {
    backgroundColor: color.third,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default ShimmerItemAntrian;
