import React, {useEffect, useRef, useState} from 'react';
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
} from 'react-native';
import {connect} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {getAllInformasiActionCreator} from '../../../../redux/actions/informasiAction';
import {
  logoutUserActionCreator,
  refreshTokenActionCreator,
} from '../../../../redux/actions/userAction';
import {getAllInformasi} from '../../../../utils/http';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {
  authRefreshToken,
  errorFetchWithFeedback,
  logout,
} from '../../../../utils/functionHelper';
import Item from './Components/Item';
import FabButton from '../../../../Components/FabButton';
import Shimmer from './Components/Shimmer';
import {AlertNotificationRoot} from 'react-native-alert-notification';

// import Icon from 'react-native-vector-icons/Ionicons';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Informasi satu',
    body: 'ini contoh keterangan berita yang digunakan pada aplikasi',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Informasi dua',
    body: 'ini contoh keterangan berita yang digunakan pada aplikasi yang akan dikembangkan kedepannya dan akan digunakan',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Informasi tiga',
    body: 'berita 2',
  },
];

const Informasi = props => {
  const navigation = useNavigation();
  const listRef = useRef(null);
  const dispatch = useDispatch();

  const [dataInfo, setDataInfo] = useState([]);
  const [onFetch, setOnFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showGoTopBtn, setShowGoTopBtn] = useState(true);

  const fetchDataInformasi = async () => {
    setOnFetch(true);
    await props
      .getAllInformasiAction(props.dataUser.token)
      .catch(error => {
        console.log(error);
        errorFetchWithFeedback(
          error,
          navigation.navigate,
          4000,
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
      })
      .finally(() => {
        setOnFetch(false);
      });
  };

  useEffect(() => {
    fetchDataInformasi();
    console.log(props.dataInformasi);
  }, []);
  useEffect(() => {
    if (props.isRejectedRefreshToken) {
      logout(
        props.dataUser.refreshToken,
        setIsLoading,
        dispatch,
        logoutUserActionCreator,
        props.navigation,
      );
    }
  }, [props.isRejectedRefreshToken]);

  useEffect(() => {
    if (props.dataInformasi) {
      setDataInfo(props.dataInformasi);
    }
  }, [props.dataInformasi]);

  const onPressItemHandler = data => {
    navigation.navigate('DetailInformasi', {
      id_informasi: data.id_informasi,
    });
  };

  const onPressFabHandler = ref => {
    listRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setShowGoTopBtn(false);
  };

  const renderItem = ({item}) =>
    props.isLoading && props.dataInformasi.length < 1 ? (
      <Shimmer data={item} key={item.id} onPressHandler={onPressItemHandler} />
    ) : (
      <Item data={item} key={item.id} onPressHandler={onPressItemHandler} />
    );

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={dataInfo}
          renderItem={renderItem}
          ref={listRef}
          refreshing={onFetch}
          onRefresh={fetchDataInformasi}
          onScrollEndDrag={() => setShowGoTopBtn(true)}
          keyExtractor={item => item.id}
        />
        <FabButton
          isShow={showGoTopBtn}
          onPressFabHandler={onPressFabHandler}
        />
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

const mapStateToProps = ({reducerUser, reducerInformasi}) => ({
  dataUser: reducerUser.data,
  dataInformasi: reducerInformasi.data,
  isRejected: reducerInformasi.isRejected,
  isRejectedRefreshToken: reducerUser.isRejectedRefreshToken,
  isFulfilled: reducerInformasi.isFulfilled,
  isLoading: reducerInformasi.isLoading,
  message: reducerInformasi.message,
  error: reducerInformasi.error,
});

const mapDispatchToProps = dispatch => ({
  getAllInformasiAction: async body =>
    await dispatch(getAllInformasiActionCreator(body)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Informasi);
