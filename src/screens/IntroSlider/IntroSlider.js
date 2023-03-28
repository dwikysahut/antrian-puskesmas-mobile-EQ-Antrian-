import {Text} from 'native-base';
import React from 'react';
import {Image, View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import styles from './style';
import {color} from '../../utils/Color';

// import Icon from 'react-native-vector-icons/Ionicons';

const slides = [
  {
    key: 'one',
    title: 'Title 1',
    text: 'Antri dari mana saja',
    image: require('../../../assets/images/antrian.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Title 2',
    text: 'Kemudahan dengan fitur Scan QR Code',
    image: require('../../../assets/images/qrcode.jpeg'),
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Rocket guy',
    text: 'Menghemat waktu anda',
    image: require('../../../assets/images/waktu.png'),
    backgroundColor: '#22bcb5',
  },
];
const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 11) / 16);
const imageWidth = dimensions.width;
const IntroSlider = () => {
  const _renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image
          style={
            (styles.image,
            {
              height: imageHeight,
              width: imageWidth,
            })
          }
          source={item.image}
        />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _onDone = () => {
    navigation.replace('Login');
  };
  const navigation = useNavigation();

  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      showPrevButton
      activeDotStyle={{backgroundColor: color.main}}
      renderNextButton={() => {
        return (
          <Text
            style={{
              fontSize: responsiveFontSize(2.3),
              color: color.main,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            Berikutnya
          </Text>
        );
      }}
      renderPrevButton={() => {
        return (
          <Text
            style={{
              fontSize: responsiveFontSize(2.3),
              fontWeight: 'bold',
              color: color.main,
              marginTop: 10,
            }}>
            Sebelumnya
          </Text>
        );
      }}
      renderDoneButton={() => {
        return (
          <Text
            style={{
              fontSize: responsiveFontSize(2.3),
              fontWeight: 'bold',
              color: 'black',
              marginTop: 10,
            }}>
            Selesai
          </Text>
        );
      }}
      onDone={_onDone}
      onSkip={_onDone}
    />
  );
};

export default IntroSlider;
