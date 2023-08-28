import {Text} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Image,
  View,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import WavyBackground from 'react-native-wavy-background';
import styles from './style';
import {color} from '../../utils/Color';

import {getNotifikasiByUserActionCreator} from '../../redux/actions/notifikasiAction';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const stateUser = useSelector(({reducerUser}) => reducerUser);
  const stateNotifikasi = useSelector(
    ({reducerNotifikasi}) => reducerNotifikasi,
  );
  const deviceWidth = Dimensions.get('window').width;

  // const spinValue = useRef(new Animated.Value(0)).current;
  const spinValue = new Animated.Value(0);
  const opacity = new Animated.Value(0);

  // First set up animation

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['-180deg', '0deg'],
  });

  const fadeIn = spinValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });

  useEffect(() => {
    // if (stateUser.data?.token?.length > 0) {
    dispatch(
      getNotifikasiByUserActionCreator(
        stateUser.data.user_id,
        stateUser.data.token,
      ),
    );
    // } else {
    //   setTimeout(() => {
    //     navigation.replace('Intro');
    //   }, 3000);
    // }
  }, []);

  useEffect(() => {
    if (stateNotifikasi.isFulfilled) {
      Animated.timing(spinValue, {
        toValue: 100,
        duration: 3000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
      }).start();
      const timeout = setTimeout(() => {
        navigation.replace('Home');
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
    if (stateNotifikasi.isRejected) {
      console.log('rejected');
      Animated.timing(spinValue, {
        toValue: 100,
        duration: 3000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
      }).start();
      const timeout = setTimeout(() => {
        navigation.replace('Intro');
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [navigation, spinValue, stateNotifikasi]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          position: 'absolute',
          bottom: -60,
          left: 0,
          right: 0,

          zIndex: 1,
        }}>
        <WavyBackground
          height={100}
          width={1100}
          amplitude={35}
          frequency={6}
          offset={50}
          bottom
          color={color.main}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: -70,
          left: 0,
          right: 0,

          zIndex: 1,
        }}>
        <WavyBackground
          height={100}
          width={1100}
          amplitude={35}
          frequency={6}
          offset={50}
          color={color.main}
        />
      </View>

      <Animated.View style={[styles.containerImage]}>
        <Animated.Image
          source={require('../../../assets/images/EQ-Puskesmas.png')}
          style={[
            styles.image,
            {
              height: '100%',
              width: '100%',
              resizeMode: 'contain',
              transform: [{rotate: spin}],
              opacity: 1,
            },
          ]}
        />
      </Animated.View>

      <Animated.Text
        style={[
          styles.welcomeText,
          {
            opacity: fadeIn,
          },
        ]}>
        Selamat Datang
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;
