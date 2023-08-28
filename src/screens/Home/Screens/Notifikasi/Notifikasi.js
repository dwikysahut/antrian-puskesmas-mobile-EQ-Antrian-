import React, {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import FabButton from '../../../../Components/FabButton';
import NotifikasiList from './Components/NotifikasiList';
import {ScrollView} from 'react-native-gesture-handler';
import PermintaanPenukaran from './Components/NotifikasiList';
import {useDispatch, useSelector} from 'react-redux';
import {
  getNotifikasiByUser,
  putAntrian,
  putNotifikasiRequest,
} from '../../../../utils/http';
import {
  alertConfirmation,
  authRefreshToken,
  dialogCallback,
  errorFetchWithFeedback,
  logout,
} from '../../../../utils/functionHelper';
import {
  logoutUserActionCreator,
  refreshTokenActionCreator,
} from '../../../../redux/actions/userAction';
import ModalTicket from './Components/ModalTicket';
import {
  getNotifikasiByUserActionCreator,
  updateNotifikasiByUserActionCreator,
} from '../../../../redux/actions/notifikasiAction';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
} from 'react-native-alert-notification';
import {SocketContext} from '../../../../context/socket';
const DATA = [
  {
    id: 'notif01',
    text_notifikasi: 'notifikasi ini adalah 1',
    jenis_notifikasi: 0,
    date_created: '10-11-2022 20:10',
    is_opened: 0,
  },
  {
    id: 'notif02',

    text_notifikasi:
      'Andi ingin menukarkan nomor antrian miliknya A3-15 dengan milik anda A3-08 ',
    jenis_notifikasi: 1,
    date_created: '10-11-2022 20:10',
    is_opened: 0,
  },
  {
    id: 'notif05',

    text_notifikasi:
      'Andi ingin menukarkan nomor antrian miliknya A3-15 dengan milik anda A3-08 ',
    jenis_notifikasi: 1,
    date_created: '10-11-2022 20:10',
    is_opened: 1,
  },
  {
    id: 'notif03',
    text_notifikasi: "Status Antrian anda 'Sedang Dilayani'",
    jenis_notifikasi: 0,
    date_created: '10-11-2022 20:10',
    is_opened: 1,
  },
];
const Notifikasi = ({navigation}) => {
  let listRef = createRef(null);
  const socket = useContext(SocketContext);

  const dispatch = useDispatch();
  const [showGoTopBtn, setShowGoTopBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRefresh, setIsLoadingRefresh] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [dataNotif, setDataNotif] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isShowModalTicket, setIsShowModalTicket] = useState(false);
  const dataUser = useSelector(({reducerUser}) => reducerUser.data);
  const dataNotifikasi = useSelector(
    ({reducerNotifikasi}) => reducerNotifikasi,
  );

  const fetchDataNotifikasi = useCallback(async () => {
    isFirstRender && setIsLoading(true);
    // getNotifikasiByUser(dataUser.user_id, dataUser.token)
    //   .then(response => {
    //     if (response.status == 200) {
    //       setDataNotif(response.data.data);
    //     }
    //   })
    //   .catch(error => {
    //     errorFetchWithFeedback(
    //       error,
    //       navigation.navigate,
    //       3000,
    //       () =>
    //         logout(
    //           dataUser.refreshToken,
    //           setIsLoading,
    //           dispatch,
    //           logoutUserActionCreator,
    //           navigation,
    //         ),
    //       () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
    //     );
    //   })
    //   .finally(() => {
    //     setTimeout(() => setIsLoading(false), 100);
    //   });
    setIsLoadingRefresh(true);
    await dispatch(
      getNotifikasiByUserActionCreator(dataUser.user_id, dataUser.token),
    );
  }, [dataUser.token, dataUser.user_id, dispatch, isFirstRender]);

  const onClickAksiHandler = (id, value) => {
    console.log('aksi');
    const formData = {
      aksi: value,
    };
    alertConfirmation('yakin untuk melanjutkan ?', () => {
      putNotifikasiRequest(id, formData, dataUser.token)
        .then(response => {
          if (response.status == 200) {
            dialogCallback(
              'Yeay',
              value == 1
                ? 'Pengajuan pertukaran antrian telah disetujui'
                : 'Pengajuan pertukaran antrian telah ditolak',
              true,
              ALERT_TYPE.SUCCESS,
            );
            fetchDataNotifikasi();
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
    });
  };
  useEffect(() => {
    if (dataNotifikasi.isFulfilled) {
      console.log(isLoading);
      setIsLoading(false);
      setIsLoadingRefresh(true);
      setIsFirstRender(false);
    }
  }, [dataNotifikasi, isLoading]);
  useEffect(() => {
    socket().on('server-editAntrian', () => {
      fetchDataNotifikasi();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount

    // socket().on('server-addAntrian', () => {
    //   fetchDataNotifikasi();
    // });
    socket().on(
      'server-postRequest',
      ({user_id_asal, user_id_tujuan, tanggal_periksa, id_praktek}) => {
        if (
          user_id_asal == dataUser.user_id ||
          user_id_tujuan == dataUser.user_id
        ) {
          fetchDataNotifikasi();
        }
      },
    );
    socket().on(
      'server-putRequest',
      ({user_id_asal, user_id_tujuan, tanggal_periksa, id_praktek}) => {
        if (
          user_id_asal == dataUser.user_id ||
          user_id_tujuan == dataUser.user_id
        ) {
          fetchDataNotifikasi();
        }
      },
    );

    fetchDataNotifikasi();
    setIsFirstRender(true);

    const unsubscribe = navigation.addListener('focus', async () => {
      await fetchDataNotifikasi();

      setIsFirstRender(true);
    });

    return unsubscribe;
  }, []);
  const onPressFabHandler = ref => {
    listRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
      // eslint-disable-next-line no-sequences
    });
    setShowGoTopBtn(false);
  };

  const onClickHandler = data => {
    console.log(selectedItem);
    setSelectedItem(data);
    setIsShowModalTicket(!isShowModalTicket);
    dispatch(updateNotifikasiByUserActionCreator(data.id_notifikasi));
  };

  const dataNotifOnly = dataNotifikasi.data
    .filter(
      item =>
        item.jenis_notifikasi < 2 ||
        (item.jenis_notifikasi == 2 && item.aksi > 0),
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const dataNotifRequest = dataNotifikasi.data.filter(
    item => item.jenis_notifikasi == 2 && item.aksi == 0,
  );
  console.log(dataNotifOnly);
  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <Animated.ScrollView
          ref={listRef}
          onScrollEndDrag={() => setShowGoTopBtn(true)}>
          <NotifikasiList
            data={dataNotifRequest}
            type="request"
            refreshing={isLoadingRefresh}
            onRefresh={fetchDataNotifikasi}
            onClickAksiHandler={onClickAksiHandler}
            isLoading={isLoading}
            onClickHandler={onClickHandler}
          />
          <View style={{marginTop: 15}} />

          <NotifikasiList
            data={dataNotifOnly}
            type="notifikasi"
            isLoading={isLoading}
            refreshing={isLoadingRefresh}
            onRefresh={fetchDataNotifikasi}
            onClickHandler={onClickHandler}
          />
        </Animated.ScrollView>

        <ModalTicket
          data={selectedItem}
          modalVisible={isShowModalTicket}
          setModalVisible={setIsShowModalTicket}
        />
        {/* <FabButton isShow={showGoTopBtn} onPressFabHandler={onPressFabHandler} /> */}
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Notifikasi;
