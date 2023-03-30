import React, {useState, useEffect, useCallback} from 'react';
import {Image, View, Dimensions, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import styles from './style';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../Components/CustomHeader';
// import Carousel from 'react-native-snap-carousel';
import Carousel from 'react-native-reanimated-carousel';
import DateListBar from './Components/DateListBar';
import {getMonthName, dateListGenerate} from '../../../../utils/DateUtils';
import ListPoli from './Components/ListPoli';
import {ImageSlider} from 'react-native-image-slider-banner';
import WavyBackground from 'react-native-wavy-background';
import {getAllAntrian, getAntrianByPrakek} from '../../../../utils/http';
import queryString from 'query-string';
import {connect, useDispatch} from 'react-redux';

import {io} from 'socket.io-client';
import {URL_BASE} from '../../../../utils/CONSTANT';
import {
  authRefreshToken,
  errorFetchWithFeedback,
  logout,
} from '../../../../utils/functionHelper';
import {
  logoutUserActionCreator,
  refreshTokenActionCreator,
} from '../../../../redux/actions/userAction';
// const DATA = [
//   {
//     id: '123141242',
//     total_antrian: 12,
//     kuota_antrian: 30,
//     nama_poli: 'Poli Umum',

//     antrian_sekarang: 'A1-12',
//   },
//   {
//     id: '14125151',
//     total_antrian: 12,
//     kuota_antrian: 30,
//     nama_poli: 'Poli Lansia',

//     antrian_sekarang: 'A2-18',
//   },
//   {
//     id: '51512521',
//     total_antrian: 12,
//     kuota_antrian: 30,
//     nama_poli: 'Poli KIA',

//     antrian_sekarang: 'A3-18',
//   },
// ];
// import Icon from 'react-native-vector-icons/Ionicons';

const Beranda = props => {
  // console.log(props);
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const [dateValue, setDateValue] = useState({
    date: new Date().getDate(),
    month: new Date().getMonth(),
    monthName: getMonthName(new Date().getMonth()),
    year: new Date().getFullYear(),
  });
  const [dataAntrian, setDataAntrian] = useState([]);
  const [dateListValue, setDateListValue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const width = Dimensions.get('window').width;

  const onChangeDateHandler = useCallback(
    item => {
      setDateValue(item);
    },
    [setDateValue, dateValue],
  );

  const fetchDataAntrianByPraktek = useCallback(async () => {
    const newDateFormatted = `${dateValue.year}-${dateValue.month}-${dateValue.date}`;
    getAntrianByPrakek(queryString.stringify({date: newDateFormatted}))
      .then(response => {
        console.log(response.data.data);
        setDataAntrian(response.data.data);
      })
      .catch(error => {
        console.log(error);
        errorFetchWithFeedback(
          error,
          props.navigation.navigate,
          2000,
          () =>
            logout(
              props.dataUser.refreshToken,
              setIsLoading,
              dispatch,
              logoutUserActionCreator,
              props.navigation,
            ),
          () =>
            authRefreshToken(
              dispatch,
              refreshTokenActionCreator,
              props.dataUser,
            ),
        );
      });
  }, [dateValue]);
  useEffect(() => {
    const socket = io(URL_BASE);
    socket.on('server-addAntrian', () => {
      fetchDataAntrianByPraktek();
    });
    socket.on('server-editAntrian', () => {
      fetchDataAntrianByPraktek();
    });

    setDateListValue(dateListGenerate());
    fetchDataAntrianByPraktek();
  }, []);
  useEffect(() => {
    fetchDataAntrianByPraktek();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateValue]);
  const onPressItemHandler = (id, title) => {
    const newDateFormatted = `${dateValue.year}-${dateValue.month}-${dateValue.date}`;

    props.navigation.navigate('DetailPoli', {
      idItem: id,
      title: title,
      date: newDateFormatted,
    });
  };
  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,

          right: 0,
          height: Dimensions.get('window').height * 0.55,
          backgroundColor: '#002408',
          transform: [{rotateY: '180deg'}],
          borderBottomEndRadius: 50,
          borderBottomStartRadius: 50,

          zIndex: 0,
        }}
      /> */}
      <CustomHeader title="Beranda" />
      {/* <Text style={{fontSize: 24, fontWeight: 'bold', marginVertical: 8}}>
        Selamat Datang di Aplikasi Antrian Puskesmas Gribig
      </Text> */}

      <ScrollView style={styles.container}>
        <View style={{marginHorizontal: 32, marginTop: 16}}>
          <ImageSlider
            localImg
            data={[
              {
                img: require('../../../../../assets/images/banner/gambar1.jpeg'),
              },
              {
                img: require('../../../../../assets/images/banner/gambar3.jpeg'),
              },
              {
                img: require('../../../../../assets/images/banner/gambar5.jpeg'),
              },
              {
                img: require('../../../../../assets/images/banner/gambar4.png'),
              },
            ]}
            autoPlay={true}
            timer={5000}
            caroselImageStyle={{resizeMode: 'cover', height: 200}}
            closeIconColor="black"
            activeIndicatorStyle={{backgroundColor: 'darkgreen'}}
            inActiveIndicatorStyle={{
              backgroundColor: 'white',

              bottom: 0,
            }}
          />
        </View>

        <View style={styles.inner}>
          <DateListBar
            dateValue={dateValue}
            dateListValue={dateListValue}
            onChangeDateHandler={onChangeDateHandler}
          />
          <ListPoli
            data={dataAntrian}
            onPressItemHandler={onPressItemHandler}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = ({reducerUser}) => ({
  isRejected: reducerUser.isRejected,
  isRejectedRefreshToken: reducerUser.isRejectedRefreshToken,
  isFulfilled: reducerUser.isFulfilled,
  isLoading: reducerUser.isLoading,
  dataUser: reducerUser.data,
  message: reducerUser.message,
  error: reducerUser.error,
});
export default connect(mapStateToProps)(Beranda);
