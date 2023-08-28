import React, {useContext, useEffect, useState} from 'react';
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
import {ScrollView, Select} from 'native-base';
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
  postNotifikasiRequest,
  postNotifikasiReverseOffline,
} from '../../../../utils/http';
import {
  logoutUserActionCreator,
  refreshTokenActionCreator,
} from '../../../../redux/actions/userAction';
import {
  authRefreshToken,
  dialogCallback,
  errorFetchWithFeedback,
  logout,
  showToast,
  showToast2,
} from '../../../../utils/functionHelper';
import {URL_BASE} from '../../../../utils/CONSTANT';
import {SocketContext} from '../../../../context/socket';

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
  const socket = useContext(SocketContext);
  const dataUser = useSelector(({reducerUser}) => reducerUser);

  const [dataPraktek, setDataPraktek] = useState([]);

  const [selectedAntrianTujuan, setSelectedAntrianTujuan] = useState(null);
  const [selectedItemAntrian, setSelectedItemAntrian] = useState(null);
  const [selectedAntrianAsal, setSelectedAntrianAsal] = useState(null);
  const [dataAntrian, setDataAntrian] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSocket, setIsSocket] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [dataAntrianByCurrentUser, setDataAntrianByCurrentUser] = useState([]);

  const [stateDate, setStateDate] = useState(route.params.date);
  // const [stateDate, setStateDate] = useState('2023-03-22');
  const [statePraktek, setStatePraktek] = useState({
    id_praktek: route.params.idItem,
  });

  const [showModalTukar, setShowModalTukar] = useState(false);
  const [alasanText, setAlasanText] = useState('');
  // console.log(route);
  const onTextChangeInputHandler = text => {
    setAlasanText(text);
  };

  const swapAntrianHandler = (
    selectedAntrianAsal,
    selectedAntrianTujuan,
    alasanText,
  ) => {
    const formData = {
      id_antrian: selectedAntrianAsal.id_antrian,
      alasan: alasanText,
      id_antrian_tujuan: selectedAntrianTujuan.id_antrian,
    };
    if (selectedAntrianTujuan.sumber == 'Mobile-Pasien') {
      postNotifikasiRequest(formData, dataUser.data.token)
        .then(response => {
          if (response.status == 201) {
            dialogCallback(
              '',
              'Pengajuan penukaran berhasil dikirimkan',
              true,
              ALERT_TYPE.SUCCESS,
            );
            setShowModalTukar(!showModalTukar);
          }
        })
        .catch(error => {
          errorFetchWithFeedback(
            error,
            navigation.navigate,
            3000,
            () =>
              logout(
                dataUser.refreshToken,
                setIsLoading,
                dispatch,
                logoutUserActionCreator,
                navigation,
              ),
            () =>
              authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
          );
        });
    } else {
      postNotifikasiReverseOffline(formData, dataUser.data.token)
        .then(response => {
          if (response.status == 201) {
            dialogCallback(
              '',
              'Pengajuan penukaran berhasil dikirimkan',
              true,
              ALERT_TYPE.SUCCESS,
            );
            setShowModalTukar(!showModalTukar);
          }
        })
        .catch(error => {
          errorFetchWithFeedback(
            error,
            navigation.navigate,
            3000,
            () =>
              logout(
                dataUser.refreshToken,
                setIsLoading,
                dispatch,
                logoutUserActionCreator,
                navigation,
              ),
            () =>
              authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
          );
        });
    }
    console.log(formData);
  };
  const onSubmitHandler = () => {
    if (alasanText.length < 1) {
      return showToast(ALERT_TYPE.WARNING, 'Oops...', 'Alasan harus diisi');
    }
    swapAntrianHandler(selectedAntrianAsal, selectedAntrianTujuan, alasanText);
  };
  const onClickItemAntrianHandler = item => {
    setShowModalTukar(!showModalTukar);
    setSelectedAntrianTujuan(item);
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
        //input antrian yang status kurang dari 6 atau belum selesai
        setDataAntrian(
          response.data.data.filter(item => item.status_antrian < 6),
        );
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
  const reFetchDataAntrianByPraktek = () => {
    getAllAntrianByFilter(
      queryString.stringify({
        id_praktek: statePraktek.id_praktek,
        tanggal_periksa: stateDate,
      }),
      dataUser.data.token,
    )
      .then(response => {
        //input antrian yang status kurang dari 6 atau belum selesai
        setDataAntrian(
          response.data.data.filter(item => item.status_antrian < 6),
        );
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
    socket().on('server-editAntrian', ({tanggal_periksa, id_praktek}) => {
      if (
        stateDate == tanggal_periksa &&
        statePraktek.id_praktek == id_praktek
      ) {
        setSelectedAntrianAsal(prevState => prevState);
        setSelectedItemAntrian(prevState => prevState);
        setIsSocket(true);
        // reFetchDataAntrianByPraktek();
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount

    socket().on('server-addAntrian', ({tanggal_periksa, id_praktek}) => {
      if (
        stateDate == tanggal_periksa &&
        statePraktek.id_praktek == id_praktek
      ) {
        setSelectedAntrianAsal(prevState => prevState);
        setSelectedItemAntrian(prevState => prevState);
        setIsSocket(true);
        // reFetchDataAntrianByPraktek();
      }
    });
    socket().on(
      'server-postRequest',
      ({user_id_asal, tanggal_periksa, id_praktek}) => {
        if (
          user_id_asal == dataUser.data.user_id &&
          stateDate == tanggal_periksa &&
          statePraktek.id_praktek == id_praktek
        ) {
          setSelectedAntrianAsal(null);
          setSelectedItemAntrian('');
          reFetchDataAntrianByPraktek();
        }
      },
    );
    socket().on(
      'server-putRequest',
      ({user_id_asal, user_id_tujuan, tanggal_periksa, id_praktek}) => {
        if (
          dataUser.data.user_id == user_id_asal &&
          stateDate == tanggal_periksa &&
          statePraktek.id_praktek == id_praktek
        ) {
          setSelectedAntrianAsal('');
          setSelectedItemAntrian('');
          reFetchDataAntrianByPraktek();
        } else {
          setSelectedAntrianAsal(prevState => prevState);
          setSelectedItemAntrian(prevState => prevState);
          setIsSocket(true);

          // reFetchDataAntrianByPraktek();
        }
      },
    );

    navigation.setOptions({
      title: route.params.title === '' ? 'Poli' : route.params.title,
    });
    setStatePraktek({id_praktek: route.params.idItem});

    const unsubscribe = navigation.addListener('focus', () => {
      fetchDataAntrianByPraktek();
    });
    return () => {
      unsubscribe;
      // socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isSocket) {
      reFetchDataAntrianByPraktek();
      setIsSocket(false);
    }
  }, [isSocket, selectedAntrianAsal, selectedItemAntrian]);

  useEffect(() => {
    if (statePraktek !== '') {
      fetchDataDetailPraktek();
      fetchDataAntrianByPraktek();
    }
  }, [statePraktek]);

  //cek apakah user terdaftar pada antrian. apabila ada maka akan memunuculkan ajukan tukar
  // jika tidak, maka memunculkan tombol daftar
  useEffect(() => {
    if (dataAntrian) {
      const checkAntrian = dataAntrian.filter(
        item =>
          item.user_id == dataUser.data.user_id && item.status_antrian < 6,
      );
      console.log(checkAntrian);
      console.log(dataAntrian);
      setDataAntrianByCurrentUser(checkAntrian);
      setUserRegistered(checkAntrian.length > 0);
    }
  }, [dataAntrian, dataUser.data.user_id]);
  useEffect(() => {
    if (selectedItemAntrian) {
      console.log(selectedItemAntrian);
      const checkAntrian = dataAntrianByCurrentUser.filter(
        item => item.id_antrian == selectedItemAntrian,
      );
      setSelectedAntrianAsal(checkAntrian[0]);
    }
  }, [dataAntrianByCurrentUser, selectedItemAntrian]);

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="white"
          barStyle="dark-content"
        />
        {/* <Animated.View style={[actionBarStyle]}> */}
        {dataUser.data.role === 3 ? (
          <TouchableOpacity
            style={styles.buttonDaftar}
            onPress={onPressButtonDaftarHandler}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Daftar
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}

        {/* </Animated.View> */}
        <View style={styles.containerImage}>
          <ImageBackground
            source={require('../../../../../assets/images/foto_puskesmas.jpeg')}
            style={
              (styles.image,
              {height: '100%', width: '100%', resizeMode: 'cover'})
            }>
            <View style={styles.darkness}>
              <View
                style={{
                  zIndex: 2,
                  backgroundColor: 'white',
                  width: '100%',
                  position: 'absolute',
                  top: 20,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderBottomLeftRadius: 40,
                  borderBottomRightRadius: 40,
                }}>
                {dataUser.data.role === 3 ? (
                  <>
                    <Text style={{color: 'black'}}>Pilih Antrian Anda</Text>
                    <Select
                      selectedValue={selectedItemAntrian || ''}
                      onValueChange={value => {
                        setSelectedItemAntrian(value);
                      }}>
                      <Select.Item
                        label="Belum dipilih"
                        value={''}
                        isDisabled
                      />
                      {dataAntrianByCurrentUser?.map(item => (
                        <Select.Item
                          label={`${item.nik}               ---            ${item.nomor_antrian}`}
                          value={item.id_antrian}
                        />
                      ))}
                    </Select>
                  </>
                ) : (
                  <></>
                )}
              </View>
              <Text style={styles.title}>{route.params.title}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.innerContent}>
          <View style={styles.timeWrapper}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '500',
                fontSize: 15,
                color: 'black',
              }}>
              Rata-rata Waktu Pelayanan :
              <Text style={{fontWeight: 'bold'}}>
                {` ${dataPraktek[0]?.waktu_pelayanan || 0}`} Menit
              </Text>
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{paddingBottom: 25}}
            style={{backgroundColor: 'white', marginTop: 15}}>
            {/* <Animated.ScrollView
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            style={{backgroundColor: 'white', marginTop: 15}}> */}
            <Text style={{fontSize: 22, color: 'black'}}>Dokter</Text>
            <ListDokter data={dataPraktek} />

            <Text style={{fontSize: 22, marginTop: 20, color: 'black'}}>
              Antrian
            </Text>

            <ListAntrian
              isLoading={isLoading}
              data={dataAntrian}
              selectedAntrianAsal={selectedAntrianAsal}
              dataUser={dataUser}
              dataAntrianByCurrentUser={dataAntrianByCurrentUser}
              onClickBtnHandler={onClickItemAntrianHandler}
            />
          </ScrollView>
          {/* </Animated.ScrollView> */}
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
    marginTop: -20,
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
