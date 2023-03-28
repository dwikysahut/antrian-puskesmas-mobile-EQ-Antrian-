import {Text} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
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

const SplashScreen = () => {
  const navigation = useNavigation();
  const stateUser = useSelector(({reducerUser}) => reducerUser);
  const deviceWidth = Dimensions.get('window').width;

  // const spinValue = useRef(new Animated.Value(0)).current;
  const spinValue = new Animated.Value(0);
  const opacity = new Animated.Value(0);

  // First set up animation

  Animated.timing(spinValue, {
    toValue: 100,
    duration: 3000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['-180deg', '0deg'],
  });
  Animated.timing(opacity, {
    toValue: 100,
    duration: 3000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start();
  const fadeIn = spinValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });

  useEffect(() => {
    setTimeout(() => {
      if (stateUser.data?.token?.length > 0) {
        navigation.replace('Home');
      } else {
        navigation.replace('Intro');
      }
    }, 3000);
  }, []);
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
              opacity: fadeIn,
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
