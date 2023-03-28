import {Text} from 'native-base';
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import styles from './style';

const AboutApps = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={require('../../../../../assets/images/logo-puskesmas2.png')}
          style={
            (styles.image,
            {height: '100%', width: '100%', resizeMode: 'contain'})
          }
        />
      </View>

      <Text style={styles.welcomeText}>EQ-Puskesmas</Text>
      <Text style={{fontSize: 18, marginTop: 20}}>Versi 1.0</Text>
      <Text style={{fontSize: 18, marginTop: 20}}>Dwiky Satria Hutomo</Text>
      <Text style={{fontSize: 18, position: 'absolute', bottom: 10}}>
        @2022
      </Text>
    </View>
  );
};

export default AboutApps;
