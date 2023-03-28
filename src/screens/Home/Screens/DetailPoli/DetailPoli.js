import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import queryString from 'query-string';
import Toast from 'react-native-toast-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView} from 'native-base';
import {io} from 'socket.io-client';

import {roundToNearestPixel} from 'react-native/Libraries/Utilities/PixelRatio';
import ListDokter from './Components/ListDokter';
import ListAntrian from './Components/ListAntrian';
import ModalTukar from './Components/ModalTukar';
import {color} from '../../../../utils/Color';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from 'react-native-alert-notification';
import {
  getAllAntrianByFilter,
  getAllDetailPraktek,
  getDetailPraktekByIdPraktek,
} from '../../../../utils/http';
import {
  logoutUserActionCreator,
  refreshTokenActionCreator,
} from '../../../../redux/actions/userAction';
import {
  authRefreshToken,
  errorFetchWithFeedback,
  logout,
  showToast,
} from '../../../../utils/functionHelper';
import {URL_BASE} from '../../../../utils/CONSTANT';

// import Icon from 'react-native-vector-icons/Ionicons';

const data = {
  title: 'Informasi 1',
  body: 'lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};
const dataAntrian = [
  {
    id: '12331',
    nomor_antrian: 'A2-01',
    sumber: 'Aplikasi-Pasien',
  },
  {
    id: '12331123',
    nomor_antrian: 'A2-02',
    sumber: 'Aplikasi-Pasien',
  },
];
// const dataDokter = [
//   {id: 1, nama: 'dr. Zhafranto Dwi R'},
//   {id: 2, nama: 'dr. Dewi Kurniati'},
//   {id: 3, nama: 'dr. Wida Sekarani P'},
//   {id: 4, nama: 'dr. Gustika Ayu S'},
//   {id: 5, nama: 'dr. Dewi Kurniati'},
// ];
// const Item = {
//   id: '123141242',
//   total_antrian: 12,
//   kuota_antrian: 30,
//   nama_poli: 'Poli Umum',

//   antrian_sekarang: 'A1-12',
// };
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DetailPoli = ({navigation, route}) => {
  const dispatch = useDispatch();
  const dataUser = useSelector(({reducerUser}) => reducerUser);
  const [statePraktek, setStatePraktek] = useState('');
  const [dataPraktek, setDataPraktek] = useState([]);
  const [selectedAntrian, setSelectedAntrian] = useState({});
  const [dataAntrian, setDataAntrian] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  // const [stateDate, setStateDate] = useState(route.params.date);
  const [stateDate, setStateDate] = useState('2023-03-22');

  const [showModalTukar, setShowModalTukar] = useState(false);
  const [alasanText, setAlasanText] = useState('');
  // console.log(route);
  const onTextChangeInputHandler = text => {
    setAlasanText(text);
  };

  const swapAntrianHandler = item => {};
  const onSubmitHandler = () => {
    if (alasanText.length < 1) {
      return showToast(ALERT_TYPE.WARNING, 'Oops...', 'Alasan harus diisi');
    }
    swapAntrianHandler(selectedAntrian);

    console.log(selectedAntrian);
  };
  const onClickItemAntrianHandler = item => {
    setShowModalTukar(!showModalTukar);
    setSelectedAntrian(item);
  };
  const onPressButtonDaftarHandler = (id, title) => {
    navigation.navigate('HomePendaftaran', {
      id_praktek: route.params.idItem,
    });
  };
  const fetchDataDetailPraktek = () => {
    getDetailPraktekByIdPraktek(
      statePraktek.id_praktek,
      dataUser.data.token,
      // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsidXNlcl9pZCI6IjMzMzMzMzMzMzMzMzMzMzMiLCJub19rayI6IjEyMzEyMzEyMyIsIm5hbWFfdXNlciI6ImR3aWt5IiwiZW1haWwiOiIyMDExMTgwMDFAbWhzLnN0aWtpLmFjLmlkIiwia29kZV92ZXJpZmlrYXNpX2VtYWlsIjoiJDJiJDA2JE9XVUJob1l1NE9PUHhTY0J4MDRxUE8yTTNYYmw2eTZKam5sb2NNM1AuWldQcDczcHJoalJPIiwidmVyaWZfZW1haWwiOjEsInZlcmlmX2FrdW4iOjEsInJvbGUiOjMsIm5vX3RlbGVwb24iOiIwMjkzMTI4MzEzMSIsImplbmlzX2tlbGFtaW4iOiJMYWtpLWxha2kiLCJ0YW5nZ2FsX2xhaGlyIjoiMjAwMC0wMy0wOVQxNzowMDowMC4wMDBaIiwiaWRfc29ja2V0IjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMy0wMi0yMFQxNToyNTozNC4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMjMtMDItMjJUMTI6Mjc6NDMuMDAwWiJ9LCJpYXQiOjE2NzcwNzYzMTAsImV4cCI6MTY3NzU5NDcxMH0.1XJSq29mJlHYtrrlBlBEJZ5AZmyvwC049-NmmX8OeFA',
    )
      .then(response => {
        setDataPraktek(response.data.data);
      })
      .catch(error => {
        errorFetchWithFeedback(
          error,
          navigation.navigate,
          2000,
          () =>
            logout(
              dataUser.refreshToken,
              setIsLoading,
              dispatch,
              logoutUserActionCreator,
              navigation,
            ),
          () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
        );
      });
  };
  const fetchDataAntrianByPraktek = () => {
    setIsLoading(true);
    getAllAntrianByFilter(
      queryString.stringify({
        id_praktek: statePraktek.id_praktek,
        tanggal_periksa: stateDate,
      }),
      dataUser.data.token,
    )
      .then(response => {
        console.log(response.data.data);
        setDataAntrian(response.data.data);
      })
      .catch(error => {
        errorFetchWithFeedback(
          error,
          navigation.navigate,
          2000,
          () =>
            logout(
              dataUser.refreshToken,
              setIsLoading,
              dispatch,
              logoutUserActionCreator,
              navigation,
            ),
          () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    const socket = io(URL_BASE);
    socket.on('server-addAntrian', () => {
      fetchDataAntrianByPraktek();
    });

    navigation.setOptions({
      title: route.params.title === '' ? 'Poli' : route.params.title,
    });
    setStatePraktek({id_praktek: route.params.idItem});
    console.log(stateDate);
  }, []);
  useEffect(() => {
    if (statePraktek !== '') {
      fetchDataDetailPraktek();
      fetchDataAntrianByPraktek();
    }
  }, [statePraktek]);
  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonDaftar}
          onPress={onPressButtonDaftarHandler}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
            Daftar
          </Text>
        </TouchableOpacity>
        <View style={styles.containerImage}>
          <ImageBackground
            source={require('../../../../../assets/images/foto_puskesmas.jpeg')}
            style={
              (styles.image,
              {height: '100%', width: '100%', resizeMode: 'cover'})
            }>
            <View style={styles.darkness}>
              <Text style={styles.title}>{route.params.title}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.innerContent}>
          <View style={styles.timeWrapper}>
            <Text
              style={{textAlign: 'center', fontWeight: '500', fontSize: 15}}>
              Rata-rata Waktu Pelayanan :
              <Text style={{fontWeight: 'bold'}}>
                {` ${dataPraktek[0]?.waktu_pelayanan || 0}`} Menit
              </Text>
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{paddingBottom: 25}}
            style={{backgroundColor: 'white', marginTop: 15}}>
            <Text style={{fontSize: 22}}>Dokter</Text>
            <ListDokter data={dataPraktek} />

            <Text style={{fontSize: 22, marginTop: 20}}>Antrian</Text>
            <ListAntrian
              isLoading={isLoading}
              data={dataAntrian}
              onClickBtnHandler={onClickItemAntrianHandler}
            />
          </ScrollView>
        </View>
        <ModalTukar
          showModalTukar={showModalTukar}
          setShowModalTukar={setShowModalTukar}
          onTextChangeInputHandler={onTextChangeInputHandler}
          onSubmitHandler={onSubmitHandler}
        />
      </View>
    </AlertNotificationRoot>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    zIndex: 2,
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
  },
  containerImage: {
    height: 350,
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: 0,
  },
  timeWrapper: {
    borderRadius: 40,
    backgroundColor: 'white',
    zIndex: 1,
    padding: 20,
    top: -30,
    position: 'absolute',
    marginHorizontal: 40,
    right: 0,
    left: 0,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  darkness: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',

    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContent: {
    borderTopLeftRadius: 30,
    flex: 1,
    marginTop: 250,
    padding: 20,
    paddingBottom: 0,
    zIndex: 20,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
  },
  buttonDaftar: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    marginHorizontal: '15%',
    borderRadius: 20,
    left: 0,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: color.main,
  },
});

export default DetailPoli;
