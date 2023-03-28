import {Text} from 'native-base';
import React, {useEffect} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import WavyBackground from 'react-native-wavy-background';

import {URL_BASE_IMAGE} from '../../../../../utils/CONSTANT';
import styles from './style';

const Shimmer = ({data, onPressHandler}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.imageWrapper}>
        <Image
          source={''}
          style={
            (styles.image,
            {
              height: '100%',
              width: '100%',
              resizeMode: 'contain',
              backgroundColor: 'darkgrey',
            })
          }
        />
      </View>
      <View style={{justifyContent: 'flex-start', flex: 2, padding: 8}}>
        {data.judul_informasi === null ? (
          <></>
        ) : (
          <Text
            numberOfLines={1}
            style={(styles.title, {backgroundColor: 'lightgrey'})}
          />
        )}

        <Text
          style={(styles.bodyText, {backgroundColor: 'lightgrey'})}
          numberOfLines={3}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Shimmer;
