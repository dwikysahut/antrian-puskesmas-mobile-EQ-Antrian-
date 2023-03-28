import {Text} from 'native-base';
import React, {useEffect} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import WavyBackground from 'react-native-wavy-background';

import {URL_BASE_IMAGE} from '../../../../../utils/CONSTANT';
import styles from './style';

const Item = ({data, onPressHandler}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.item} onPress={() => onPressHandler(data)}>
      <View style={styles.imageWrapper}>
        {data.gambar === null ? (
          <Image
            source={{uri: `${URL_BASE_IMAGE}/no-image.jpeg`}}
            style={
              (styles.image,
              {height: '100%', width: '100%', resizeMode: 'contain'})
            }
          />
        ) : (
          <Image
            source={
              data.gambar?.toString().includes('https')
                ? {uri: `${data.gambar}`}
                : {uri: `${URL_BASE_IMAGE}/${data.gambar}`}
            }
            style={
              (styles.image,
              {height: '100%', width: '100%', resizeMode: 'contain'})
            }
          />
        )}
      </View>
      <View style={{justifyContent: 'flex-start', flex: 2, padding: 8}}>
        {data.judul_informasi === null ? (
          <></>
        ) : (
          <Text numberOfLines={1} style={styles.title}>
            {data.judul_informasi}
          </Text>
        )}

        <Text style={styles.bodyText} numberOfLines={3}>
          {data.isi_informasi}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
