import {
  Input,
  Text,
  Stack,
  Pressable,
  Icon,
  Button,
  Box,
  TextArea,
  Select,
} from 'native-base';
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react';
import {
  Image,
  View,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';

import CardItem from '../Components/CardItem';
import SelectMember from '../../../Components/SelectMember';
import ModalTicket from '../Components/ModalTicket';
import FabButton from '../../../../../Components/FabButton';
import {color} from '../../../../../utils/Color';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllAntrianByFilter,
  getAllAntrianByUser,
  getDetailAntrianByIdAntrian,
  getDetailFinishAntrianByIdAntrian,
  getEstimasiWaktu,
  putStatusAntrian,
} from '../../../../../utils/http';
import {
  alertConfirmation,
  authRefreshToken,
  dialogCallback,
  errorFetchWithFeedback,
  logout,
} from '../../../../../utils/functionHelper';
import {
  logoutUserActionCreator,
  refreshTokenActionCreator,
} from '../../../../../redux/actions/userAction';
import {SocketContext} from '../../../../../context/socket';
import EmptyList from '../../../../Components/EmptyList';
import ShimmerAntrian from '../Components/Shimmer';
import {getAllPasienByNoKKActionCreator} from '../../../../../redux/actions/pasienAction';
import {getAllPraktekActionCreator} from '../../../../../redux/actions/praktekAction';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
} from 'react-native-alert-notification';
import {getKartuKeluargaByIdActionCreator} from '../../../../../redux/actions/kartuKeluarga';
import LoaderModal from '../../../../../Components/LoaderModal';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    nama_poli: 'poli umum',
    nomor_antrian: 'A3-14',
    tgl_kunjungan: '20-08-2022',
    id_status: 2,
    status: 'Menunggu Pelayanan Poli',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    nama_poli: 'poli umum',
    nomor_antrian: 'A3-14',
    tgl_kunjungan: '20-08-2022',
    id_status: 1,
    status: 'Terdaftar',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    nama_poli: 'poli umum',
    nomor_antrian: 'A3-14',
    tgl_kunjungan: '20-08-2022',
    id_status: 2,
    status: 'Menunggu Pelayanan Poli',
  },
];
const ActiveAntrian = () => {
  const navigation = useNavigation();
  const listRef = useRef(null);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const dataUser = useSelector(({reducerUser}) => reducerUser.data);
  const dataPasienByNoKK = useSelector(({reducerPasien}) => reducerPasien);
  const [showGoTopBtn, setShowGoTopBtn] = useState(false);
  const [isLoadingAntrian, setIsLoadingAntrian] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isLoadingRefresh, setIsLoadingRefresh] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [dataAntrian, setDataAntrian] = useState({filteredData: [], data: []});
  const [dataTimeAntrian, setDataTimeAntrian] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [selectMember, setSelectedMember] = useState({
    item: '',
    isSocket: false,
  });
  const setDataDetailHandler = data => {
    setDataDetail(data);
  };
  const onPressFabHandler = ref => {
    listRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
      // eslint-disable-next-line no-sequences
    });
    setShowGoTopBtn(false);
  };

  const onRefreshFetch = async () => {
    setIsLoadingRefresh(true);
    await fetchAllAntrian();
    setIsLoadingRefresh(false);
  };
  const fetchDataKartuKeluargaByID = useCallback(() => {
    dispatch(getKartuKeluargaByIdActionCreator(dataUser.no_kk, dataUser.token));
  }, [dataUser, dispatch]);

  const fetchAllAntrian = useCallback(async () => {
    if (isFirstRender) {
      console.log('first render');
      setIsLoadingAntrian(true);
    }

    getAllAntrianByUser(dataUser.token)
      .then(response => {
        if (response.status == 200) {
          console.log(response.data.data);
          const newData = response.data.data.filter(
            item => item.status_antrian < 6,
          );
          let newFilteredData = [];
          console.log(selectMember);

          newFilteredData = newData.filter(
            item =>
              item.nik?.toString().toLowerCase() ==
              selectMember.item.toLowerCase(),
          );

          setDataAntrian({
            filteredData: [...newFilteredData],
            data: [...newData],
          });
        }
      })
      .catch(error => {
        console.log(error);
        errorFetchWithFeedback(
          error,
          navigation.navigate,
          3000,
          () =>
            logout(
              dataUser.refreshToken,
              setIsLoadingAntrian,
              dispatch,
              logoutUserActionCreator,
              navigation,
            ),
          () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
        );
      })
      .finally(() => {
        setIsLoadingAntrian(false);
        setIsLoadingRefresh(false);
        setIsFirstRender(false);
      });
  }, [dataUser, dispatch, isFirstRender, navigation, selectMember]);

  const fetchPasienByKK = useCallback(async () => {
    dispatch(getAllPasienByNoKKActionCreator(dataUser.no_kk, dataUser.token));
  }, [dataUser, dispatch]);

  const fetchDetailAntrian = useCallback(
    async data => {
      getDetailFinishAntrianByIdAntrian(data.id_antrian, dataUser.token)
        .then(response => {
          if (response.status == 200) {
            console.log(response.data.data);
            setDataDetail({...data, ...response.data.data});
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
                setIsLoadingAntrian,
                dispatch,
                logoutUserActionCreator,
                navigation,
              ),
            () =>
              authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
          );
        })
        .finally(() => {});
    },
    [dataUser, dispatch, isFirstRender, navigation],
  );

  useEffect(() => {
    console.log(selectMember);

    if (selectMember.isSocket && !dataAntrian.isSocket) {
      console.log('fetch disini antrian');
      fetchAllAntrian();

      setSelectedMember(prevState => ({...prevState, isSocket: false}));
    }
  }, [dataAntrian.isSocket, fetchAllAntrian, selectMember]);

  useEffect(() => {
    console.log(selectMember);

    if (dataAntrian.isSocket) {
      console.log(dataAntrian);
      // console.log(
      //   dataAntrian.data.filter(
      //     item =>
      //       item.id_praktek == dataAntrian.id_praktek_socket &&
      //       new Date(item.tanggal_periksa).toLocaleDateString('id') ==
      //         new Date(dataAntrian.tanggal_periksa_socket).toLocaleDateString(
      //           'id',
      //         ),
      //   ),
      // );
      if (
        dataAntrian.data.filter(
          item =>
            item.id_praktek == dataAntrian.id_praktek_socket &&
            new Date(item.tanggal_periksa).toLocaleDateString('id') ==
              new Date(dataAntrian.tanggal_periksa_socket).toLocaleDateString(
                'id',
              ),
        ).length > 0
      ) {
        fetchAllAntrian();
      }
      setDataAntrian(prevState => ({
        ...prevState,
        isSocket: false,
        id_praktek_socket: '',
        tanggal_periksa_socket: '',
      }));
      setSelectedMember(prevState => ({...prevState, isSocket: false}));
    }
  }, [fetchAllAntrian, dataAntrian, selectMember]);

  const reFetchAntrian = async () => {
    const newData =
      dataDetail == null
        ? null
        : dataAntrian.data.filter(
            item => item.id_antrian == dataDetail.id_antrian,
          )[0];
    setDataDetail(prevState => ({...prevState, ...newData, isSocket: true}));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAllAntrian();
      setIsFirstRender(true);
      fetchPasienByKK();
      fetchDataKartuKeluargaByID();
      setIsLoadingAntrian(true);
      setSelectedMember({item: '', isSocket: false});
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
    };
  }, []);
  useEffect(() => {
    if (dataDetail !== null) {
      console.log('tidak null');
      if (
        dataDetail.isSocket !== undefined &&
        dataDetail.isSocket &&
        dataDetail.result_socket
      ) {
        console.log('tidak undefined');
        console.log(dataDetail.id_antrian);
        console.log(dataDetail.result_socket.id_antrian);
        if (dataDetail.id_antrian == dataDetail.result_socket.id_antrian) {
          refetchGetEstimasiWaktu(dataDetail.result_socket);
        } else {
          refetchGetEstimasiWaktu({...dataDetail});
        }
      }
    }
  }, [dataDetail]);
  useEffect(() => {
    console.log(selectMember);
    // socket.emit('user-connected', dataUser.user_id);
    console.log(dataAntrian);
    socket().on(
      'server-editAntrian',
      ({result, id_praktek, tanggal_periksa}) => {
        console.log(result);
        console.log(dataAntrian);
        // const newData = dataAntrian.data?.map(item => {
        //   if (item.id_antrian == result.id_antrian) {
        //     return result;
        //   }
        //   return item;
        // });
        // const newFilteredData = newData.filter(
        //   item =>
        //     item.nik?.toString().toLowerCase() == selectMember.item.toLowerCase(),
        // );

        setDataDetail(prevState => ({
          ...prevState,
          result_socket: {...result},
          isSocket: true,
        }));
        if (result.user_id == dataUser.user_id) {
          setSelectedMember(prevState => ({...prevState, isSocket: true}));
        } else {
          if (result.user_id == dataUser.user_id) {
            setSelectedMember(prevState => ({...prevState, isSocket: true}));
          }

          setDataAntrian(prevState => ({
            ...prevState,
            isSocket: true,
            id_praktek_socket: id_praktek,
            tanggal_periksa_socket: tanggal_periksa,
          }));
        }
        // setModalVisible(false);
      },
    );
    // refetch untuk user pendaftar saja
    socket().on(
      'server-addAntrian',
      ({result, tanggal_periksa, id_praktek}) => {
        console.log(dataAntrian);
        if (result.user_id == dataUser.user_id) {
          setSelectedMember(prevState => ({...prevState, isSocket: true}));
        } else {
          if (result.user_id == dataUser.user_id) {
            setSelectedMember(prevState => ({...prevState, isSocket: true}));
          }

          setDataAntrian(prevState => ({
            ...prevState,
            isSocket: true,
            id_praktek_socket: id_praktek,
            tanggal_periksa_socket: tanggal_periksa,
          }));
        }
      },
    );
  }, []);
  const refetchGetEstimasiWaktu = async data => {
    try {
      const response = await getEstimasiWaktu(data.id_antrian);
      if (response.status == 200) {
        console.log(response.data.data);
        const newData = {
          ...data,
          estimasi_waktu_pelayanan: response.data.data.estimasi_waktu_pelayanan,
          waktu_pelayanan: response.data.data.waktu_pelayanan,
          sisa_antrian: response.data.data.sisa_antrian,
          isSocket: false,
        };

        setDataDetailHandler({...newData, isSocket: false, result_socket: ''});
      }
    } catch (error) {
    } finally {
      setIsLoadingModal(false);
    }
  };

  // useEffect(() => {
  //   if (dataDetail?.isSocket) {
  //     console.log('masuk nih issocket');
  //     refetchGetEstimasiWaktu(dataDetail);
  //     setDataDetail(prevState => ({...prevState, isSocket: false}));
  //   }
  // }, [dataDetail?.isSocket, refetchGetEstimasiWaktu]);
  const updateStatusAntrianHandler = useCallback(
    data => {
      alertConfirmation('Yakin untuk membatalkan antrian ?', () => {
        console.log(data);
        putStatusAntrian(
          data.id_antrian,
          {status_antrian: 7, sumber: 'Mobile-Pasien'},
          dataUser.token,
        )
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              console.log(response);
              dialogCallback(
                'Success',
                'Status Antrian berhasil di perbarui',
                true,
                ALERT_TYPE.SUCCESS,
              );
              fetchAllAntrian();
            }
            if (response.status == 204) {
              dialogCallback(
                'Oops..',
                'Gagal memperbarui status antrian, Poli penuh',
                true,
                ALERT_TYPE.DANGER,
              );
            }
          })
          .catch(error => {
            console.log(error);
            errorFetchWithFeedback(
              error,
              navigation.navigate,
              3000,
              () =>
                logout(
                  dataUser.refreshToken,
                  null,
                  dispatch,
                  logoutUserActionCreator,
                  navigation,
                ),
              () =>
                authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
            );
          });
      });
    },
    [dataUser, dispatch, navigation],
  );
  useEffect(() => {
    if (selectMember.item !== '') {
      const filteredData = dataAntrian?.data?.filter(
        item =>
          item.nik?.toString().toLowerCase() == selectMember.item.toLowerCase(),
      );
      setDataAntrian({...dataAntrian, filteredData: [...filteredData]});
    }
  }, [selectMember.item]);

  const onPressDetailHandler = async data => {
    console.log(data);
    setIsLoadingModal(true);
    try {
      const response = await getEstimasiWaktu(data.id_antrian);
      if (response.status == 200) {
        console.log(response.data.data);
        const newData = {
          ...data,

          estimasi_waktu_pelayanan: response.data.data.estimasi_waktu_pelayanan,
          sisa_antrian: response.data.data.sisa_antrian,
          waktu_pelayanan: response.data.data.waktu_pelayanan,
        };
        setModalVisible(true);
        setDataDetailHandler(newData);
      }
    } catch (error) {
    } finally {
      setIsLoadingModal(false);
    }
  };
  const renderItem = ({item}) => (
    <CardItem
      data={item}
      isActive={1}
      key={item.id_antrian}
      modalVisible={modalVisible}
      navigation={navigation}
      setModalVisible={setModalVisible}
      setDataDetailHandler={setDataDetailHandler}
      onPressDetailHandler={onPressDetailHandler}
      batalHandler={updateStatusAntrianHandler}
    />
  );
  // useEffect(onPressFabHandler);
  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <LoaderModal
          modalVisible={isLoadingModal}
          setModalVisible={setIsLoadingModal}
        />
        <TouchableOpacity
          style={styles.btnPendaftaran}
          onPress={() => navigation.navigate('HomePendaftaran')}>
          <Text style={styles.textBtnWhite}>Buat Pendaftaran Antrian</Text>
        </TouchableOpacity>
        <SelectMember
          data={dataPasienByNoKK?.data}
          selectedMember={selectMember}
          extended
          setSelectedMember={setSelectedMember}
        />
        {isLoadingAntrian & isFirstRender ? (
          [...Array(5)].map((item, i) => <ShimmerAntrian key={i} />)
        ) : (
          <FlatList
            ref={listRef}
            onScrollEndDrag={() => setShowGoTopBtn(true)}
            style={{marginTop: 10, height: '100%'}}
            refreshing={isLoadingRefresh}
            onRefresh={onRefreshFetch}
            data={
              selectMember.item !== ''
                ? dataAntrian.filteredData
                : dataAntrian.data
            }
            ListEmptyComponent={<EmptyList />}
            keyExtractor={item => item.id_antrian}
            renderItem={renderItem}
          />
        )}

        {dataDetail !== null ? (
          <ModalTicket
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            data={dataDetail}
          />
        ) : (
          <></>
        )}
        <FabButton
          isShow={showGoTopBtn}
          onPressFabHandler={onPressFabHandler}
        />
      </View>
    </AlertNotificationRoot>
  );
};

export default ActiveAntrian;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,

    paddingHorizontal: 16,

    backgroundColor: 'white',
  },
  btnPendaftaran: {
    paddingVertical: 12,
    marginTop: 4,
    paddingHorizontal: 16,

    alignItems: 'center',
    backgroundColor: color.main,
    borderRadius: 5,
  },
  textBtnWhite: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 1.5,
  },
});
