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
  getAntrianById,
  getDetailAntrianByIdAntrian,
  getDetailFinishAntrianByIdAntrian,
  getEstimasiWaktu,
} from '../../../../../utils/http';
import {
  authRefreshToken,
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
const HistoryAntrian = () => {
  const navigation = useNavigation();
  const listRef = useRef(null);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const dataUser = useSelector(({reducerUser}) => reducerUser.data);
  const dataPasienByNoKK = useSelector(({reducerPasien}) => reducerPasien);
  const [showGoTopBtn, setShowGoTopBtn] = useState(false);
  const [isLoadingAntrian, setIsLoadingAntrian] = useState(false);
  const [isLoadingRefresh, setIsLoadingRefresh] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [dataAntrian, setDataAntrian] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [selectMember, setSelectedMember] = useState({
    item: '',
    isSocket: false,
  });
  const setDataDetailHandler = data => {
    fetchDetailAntrian(data);
    // setDataDetail(data);
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
  const fetchAllAntrian = useCallback(async () => {
    if (isFirstRender) {
      console.log('first render');
      setIsLoadingAntrian(true);
    }

    getAllAntrianByUser(dataUser.token)
      .then(response => {
        if (response.status == 200) {
          // console.log(response.data.data);
          const filtered = response.data.data.filter(
            item => item.status_antrian > 5,
          );
          let newFilteredData = [];
          console.log(selectMember);

          newFilteredData = filtered.filter(
            item =>
              item.nik?.toString().toLowerCase() ==
              selectMember.item.toLowerCase(),
          );

          setDataAntrian({
            filteredData: [...newFilteredData],
            data: [...filtered],
          });
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
          () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
        );
      })
      .finally(() => {
        setIsLoadingAntrian(false);
        setIsLoadingRefresh(false);
        setIsFirstRender(false);
      });
  }, [dataUser, dispatch, isFirstRender, navigation, selectMember]);

  const onPressDetailHandler = async data => {
    console.log(data);
    setModalVisible(true);
    setDataDetail(data);
  };
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
    socket().on('server:addAntrian', () => {
      setSelectedMember(prevState => ({...prevState, isSocket: true}));
    });
    socket().on('server-editAntrian', () => {
      setSelectedMember(prevState => ({...prevState, isSocket: true}));
    });
    fetchAllAntrian();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAllAntrian();
      setIsFirstRender(true);

      setIsLoadingAntrian(true);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return () => {
      unsubscribe;
      // socket.disconnect();
    };
  }, []);
  useEffect(() => {
    console.log(selectMember);

    if (selectMember.isSocket) {
      console.log('fetch disini antrian');
      fetchAllAntrian();
      setSelectedMember(prevState => ({...prevState, isSocket: false}));
    }
  }, [fetchAllAntrian, selectMember]);
  useEffect(() => {
    if (selectMember.item !== '') {
      console.log(dataAntrian);
      const filteredData = dataAntrian?.data?.filter(item =>
        item.nik
          ?.toString()
          .toLowerCase()
          .includes(selectMember.item.toLowerCase()),
      );
      setDataAntrian({...dataAntrian, filteredData});
    }
  }, [selectMember]);

  const renderItem = ({item}) => (
    <CardItem
      data={item}
      isActive={1}
      modalVisible={modalVisible}
      navigation={navigation}
      onPressDetailHandler={onPressDetailHandler}
      setModalVisible={setModalVisible}
      setDataDetailHandler={setDataDetailHandler}
      batalHandler={() => {}}
    />
  );
  // useEffect(onPressFabHandler);
  return (
    <View style={styles.container}>
      <SelectMember
        data={dataPasienByNoKK?.data}
        selectedMember={selectMember}
        extended
        setSelectedMember={setSelectedMember}
      />
      {isLoadingAntrian ? (
        [...Array(5)].map((item, i) => <ShimmerAntrian key={i} />)
      ) : (
        <FlatList
          ref={listRef}
          onScrollEndDrag={() => setShowGoTopBtn(true)}
          refreshing={isLoadingRefresh}
          onRefresh={onRefreshFetch}
          style={{marginTop: 10, height: '100%'}}
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
      <FabButton isShow={showGoTopBtn} onPressFabHandler={onPressFabHandler} />
    </View>
  );
};

export default HistoryAntrian;

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
