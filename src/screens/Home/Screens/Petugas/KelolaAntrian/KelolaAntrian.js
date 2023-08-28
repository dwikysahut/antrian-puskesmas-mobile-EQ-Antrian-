import queryString from 'query-string';
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
} from 'react-native-alert-notification';
import {useDispatch, useSelector} from 'react-redux';
import {io} from 'socket.io-client';
import FabButton from '../../../../../Components/FabButton';
import {getAllPraktekActionCreator} from '../../../../../redux/actions/praktekAction';
import {
  logoutUserActionCreator,
  refreshTokenActionCreator,
} from '../../../../../redux/actions/userAction';
import {confirmationMessage, URL_BASE} from '../../../../../utils/CONSTANT';
import {
  alertConfirmation,
  authRefreshToken,
  dateOnlyConvert,
  dateToDBConvert,
  dialogCallback,
  dialogFeedback,
  errorFetchWithFeedback,
  getFullDate,
  logout,
} from '../../../../../utils/functionHelper';
import {
  getAllAntrian,
  getAllAntrianByFilter,
  putAntrian,
  putStatusAntrian,
} from '../../../../../utils/http';
import ActivityIndicatorComponent from '../../../../Components/ActivityLoaderComponent';
import EmptyList from '../../../../Components/EmptyList';

import ItemAntrian from './Components/ItemAntrian';
import ModalKehadiran from './Components/ModalKehadiran';
import ModalStatusAntrian from './Components/ModalStatusAntrian';
import SelectPoli from './Components/SelectPoli';
import {SocketContext} from '../../../../../context/socket';
import LoaderModal from '../../../../../Components/LoaderModal';

const DATA = [
  {
    id: '1223',
    jenis_poli: 'poli umum',
    nomor_antrian: 'A3-10',
    tgl_kunjungan: '22-10-2022',
    status_kehadiran: 1,
    id_status: 2,
    sumber: 'aplikasi (petugas)',
    status_antrian: 'menunggu pelayanan poli',
  },
  {
    id: '12234',
    jenis_poli: 'poli umum',
    nomor_antrian: 'A3-10',
    tgl_kunjungan: '22-10-2022',
    status_kehadiran: 1,
    sumber: 'aplikasi (petugas)',
    status_antrian: 'menunggu pelayanan poli',
    id_status: 2,
  },
  {
    id: '12235',
    jenis_poli: 'poli umum',
    nomor_antrian: 'A3-10',
    tgl_kunjungan: '22-10-2022',
    status_kehadiran: 0,
    sumber: 'aplikasi (petugas)',
    id_status: 5,
    status_antrian: 'selesai',
  },
];

const KelolaAntrian = ({navigation}) => {
  const listRef = useRef(null);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const dataPraktek = useSelector(({reducerPraktek}) => reducerPraktek);
  const dataUser = useSelector(({reducerUser}) => reducerUser.data);
  const [dataAntrian, setDataAntrian] = useState([]);
  const [isLoadingAntrian, setIsLoadingAntrian] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(false);

  const [isShowStatusModal, setIsShowStatusModal] = useState(false);
  const [isShowKehadiran, setIsShowKehadiranModal] = useState(false);

  const [selectedData, setSelectedData] = useState({});

  const [poliValue, setPoliValue] = useState({
    value: dataPraktek?.data[0]?.id_praktek || '',
    isSocket: false,
  });
  const [showGoTopBtn, setShowGoTopBtn] = useState(false);

  const onPressFabHandler = ref => {
    listRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
      // eslint-disable-next-line no-sequences
    });
    setShowGoTopBtn(false);
  };

  const fetchAllAntrian = useCallback(async () => {
    if (isFirstRender) {
      setIsLoadingAntrian(true);
    }
    console.log('fetch nih');
    getAllAntrianByFilter(
      queryString.stringify(
        {
          id_praktek: poliValue.value,
          tanggal_periksa: dateToDBConvert(),
          // tanggal_periksa: '2023-03-22',
        },
        dataUser.token,
      ),
    )
      .then(response => {
        console.log(response.data.data);

        setDataAntrian(response.data.data);
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
          () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
        );
      })
      .finally(() => {
        setIsLoadingAntrian(false);
        setIsFirstRender(false);
      });
  }, [dataUser, dispatch, isFirstRender, navigation, poliValue]);

  const onPoliChangeHandler = value => {
    setPoliValue(prevState => ({...prevState, value: value}));
  };

  useEffect(() => {
    fetchAllAntrian();
  }, [fetchAllAntrian, poliValue.value]);

  useEffect(() => {
    socket().on('server-addAntrian', ({tanggal_periksa, id_praktek}) => {
      setPoliValue(prevState => ({
        ...prevState,
        isSocket: true,
        tanggal_periksa_socket: tanggal_periksa,
        id_praktek_socket: id_praktek,
      }));
    });
    socket().on('server-editAntrian', ({tanggal_periksa, id_praktek}) => {
      setPoliValue(prevState => ({
        ...prevState,
        isSocket: true,
        tanggal_periksa_socket: tanggal_periksa,
        id_praktek_socket: id_praktek,
      }));
    });
    socket().on('server-swapAntrian', ({tanggal_periksa, id_praktek}) => {
      setPoliValue(prevState => ({
        ...prevState,
        isSocket: true,
        tanggal_periksa_socket: tanggal_periksa,
        id_praktek_socket: id_praktek,
      }));
    });
    setIsFirstRender(true);
    fetchAllAntrian();
    dispatch(getAllPraktekActionCreator(dataUser.token));

    const unsubscribe = navigation.addListener('focus', () => {
      fetchAllAntrian();
      setIsFirstRender(true);
      setPoliValue({
        value: dataPraktek?.data[0]?.id_praktek || '',
        isSocket: false,
      });
      dispatch(getAllPraktekActionCreator(dataUser.token));
      console.log('focus');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      // socket.disconnect();
      unsubscribe;
    };
  }, []);
  useEffect(() => {
    if (poliValue.isSocket) {
      if (
        poliValue.tanggal_periksa_socket == getFullDate() &&
        poliValue.id_praktek_socket == poliValue.value
      ) {
        console.log('fetch');
        fetchAllAntrian();
      }
      // else if (
      //   poliValue.tanggal_periksa_socket == getFullDate() &&
      //   poliValue.id_praktek_socket != poliValue.value &&
      //   poliValue.value == ''
      // ) {
      //   console.log('fetch kosong');
      //   fetchAllAntrian();
      // }
      setPoliValue(prevState => ({...prevState, isSocket: false}));
    }
  }, [poliValue]);

  useEffect(() => {
    if (dataPraktek.isRejected) {
      errorFetchWithFeedback(
        dataPraktek.error,
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
        () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
      );
    }
  }, [
    dataPraktek.error,
    dataPraktek.isRejected,
    dataUser,
    dispatch,
    navigation,
  ]);

  const onClickShowStatusModal = data => {
    setIsShowStatusModal(!isShowKehadiran);
    setSelectedData(data);
  };
  const onClickShowKehadiranModal = data => {
    setIsShowKehadiranModal(!isShowStatusModal);
    setSelectedData(data);
  };

  const updateKehadiranHandler = (data, value) => {
    const message = value == 1 ? 'Hadir' : 'Tidak Hadir';

    alertConfirmation(`Ubah status kehadiran menjadi "${message}"`, () => {
      console.log(data);
      setIsLoadingModal(true);
      putStatusAntrian(data.id_antrian, {status_hadir: value}, dataUser.token)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            console.log(response);
            dialogCallback(
              'Success',
              'Status Kehadiran berhasil di ubah',
              true,
              ALERT_TYPE.SUCCESS,
              () => setIsShowKehadiranModal(!isShowKehadiran),
            );
            fetchAllAntrian();
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
        })
        .finally(() => {
          setIsLoadingModal(false);
        });
    });
  };
  const onClickPanggilHandler = data => {
    console.log('panggil');
    socket().emit('client-publishNotification', 'poli', data);
  };
  const updateStatusAntrianHandler = useCallback(
    (data, value) => {
      alertConfirmation('Yakin untuk mengubah status antrian ?', () => {
        console.log(data);
        setIsLoadingModal(true);
        putStatusAntrian(
          data.id_antrian,
          {status_antrian: value, sumber: 'Mobile-Petugas'},
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
                () => setIsShowStatusModal(!isShowStatusModal),
              );
              fetchAllAntrian();
            }
            if (response.status == 204) {
              dialogCallback(
                'Oops..',
                'Gagal memperbarui status antrian, Poli penuh',
                true,
                ALERT_TYPE.DANGER,
                () => setIsShowStatusModal(!isShowStatusModal),
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
          })
          .finally(() => {
            setIsLoadingModal(false);
          });
      });
    },
    [dataUser, dispatch, isShowStatusModal, navigation],
  );
  // handlerKehadiran,
  const renderItem = ({item}) => {
    return (
      <ItemAntrian
        data={item}
        onClickShowKehadiranModal={onClickShowKehadiranModal}
        onClickPanggilHandler={onClickPanggilHandler}
        onClickShowStatusModal={onClickShowStatusModal}
      />
    );
  };

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <SelectPoli
          poliValue={poliValue.value}
          onPoliChangeHandler={onPoliChangeHandler}
          dataPoli={dataPraktek.data}
        />
        {!isLoadingAntrian ? (
          <FlatList
            data={dataAntrian}
            ref={listRef}
            renderItem={renderItem}
            ListEmptyComponent={<EmptyList />}
            onScrollEndDrag={() => setShowGoTopBtn(true)}
            keyExtractor={item => item.id}
          />
        ) : (
          <ActivityIndicatorComponent />
        )}

        <ModalKehadiran
          isShow={isShowKehadiran}
          setIsShow={setIsShowKehadiranModal}
          data={selectedData}
          handler={updateKehadiranHandler}
        />
        <ModalStatusAntrian
          isShow={isShowStatusModal}
          setIsShow={setIsShowStatusModal}
          data={selectedData}
          handler={updateStatusAntrianHandler}
        />
        <FabButton
          isShow={showGoTopBtn}
          onPressFabHandler={onPressFabHandler}
        />
        <LoaderModal
          modalVisible={isLoadingModal}
          setModalVisible={setIsLoadingModal}
        />
      </View>
    </AlertNotificationRoot>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
});
export default KelolaAntrian;
