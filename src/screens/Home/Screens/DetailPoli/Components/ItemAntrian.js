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

const ItemAntrian = ({data, onClickBtnHandler}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="person" size={30} color="black" style={{flex: 0.5}} />
      <View style={{flex: 2}}>
        <Text style={{fontWeight: '500', fontSize: 14}}>
          No. Antrian :{' '}
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            {data.nomor_antrian}
          </Text>
        </Text>
        <Text style={{marginTop: 8}}>{data.sumber}</Text>
      </View>
      <View style={{flex: 1.5}}>
        {data.sumber == 'Mobile-Pasien' ? (
          <TouchableOpacity
            style={styles.btnTukar}
            onPress={() => onClickBtnHandler(data)}>
            <Text
              style={{
                color: color.main,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Ajukan Tukar
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
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

export default ItemAntrian;
