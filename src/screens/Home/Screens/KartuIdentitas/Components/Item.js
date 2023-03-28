import {Text} from 'native-base';
import React, {useEffect} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import WavyBackground from 'react-native-wavy-background';
import styles from './style';

const Item = ({nama, nik, onPressHandler}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.item}>
      <View style={{justifyContent: 'space-evenly', flex: 2}}>
        <Text numberOfLines={1} style={styles.title}>
          {nama}
        </Text>
        <Text numberOfLines={1} style={styles.subtitle}>
          {nik}
        </Text>
      </View>
      <View style={styles.buttonDetailWrapper}>
        <TouchableOpacity style={styles.btnDetail} onPress={onPressHandler}>
          <Text style={{color: 'white'}}>Lihat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Item;
