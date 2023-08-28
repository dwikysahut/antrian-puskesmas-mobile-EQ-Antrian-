import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Dimensions,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'native-base';

import Item from './Components/Item';
import {useDispatch, useSelector} from 'react-redux';
import LoaderIndicator from '../../../../Components/LoaderIndicator';
import {getAllPasienNoKK} from '../../../../utils/http';
import CustomTextContent from '../../../../Components/CustomTextContent';
import {
  authRefreshToken,
  errorFetchWithFeedback,
  logout,
} from '../../../../utils/functionHelper';
import {
  logoutUserActionCreator,
  refreshTokenActionCreator,
} from '../../../../redux/actions/userAction';

// import Icon from 'react-native-vector-icons/Ionicons';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2823ba',
    nama: 'Dwiky',
    nik: '2314012412512124',
    url: '',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b11a',
    nama: 'Satria',
    nik: '3530392849123891',
    url: '',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    nama: 'Hutomo',
    nik: '1549429310238191',
    url: '',
  },
];

const KartuIdentitas = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dataUser = useSelector(({reducerUser}) => reducerUser.data);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  const [isFetch, setIsFetch] = useState(false);

  const fetchDataKeluarga = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllPasienNoKK(
        dataUser.no_kk,
        // '1111111111111111',
        dataUser.token,
      );
      if (response.status === 200) {
        setIsLoading(false);
        console.log(response.data.data);
        setData(response.data.data);
      }
    } catch (error) {
      errorFetchWithFeedback(
        error,
        navigation.navigate,
        3000,
        () =>
          logout(
            props.dataUser.refreshToken,
            setIsLoading,
            dispatch,
            logoutUserActionCreator,
            props.navigation,
          ),
        () =>
          authRefreshToken(dispatch, refreshTokenActionCreator, props.dataUser),
      );
    } finally {
      setIsLoading(false);
    }
  }, [dataUser.token, dataUser.user_id]);

  useEffect(() => {
    fetchDataKeluarga();
    console.log(dataUser);
  }, []);
  useEffect(() => {
    if (isFocused) {
      fetchDataKeluarga();
    }
  }, [isFocused]);

  const renderItem = ({item}) => (
    <Item
      nama={item.nama}
      nik={item.nik}
      onPressHandler={() => {
        navigation.navigate('DetailKartuIdentitas', {item: item});
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoaderIndicator />
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          refreshing={isLoading}
          onRefresh={fetchDataKeluarga}
          keyExtractor={item => item.nik}
        />
      ) : (
        <CustomTextContent text="Belum terdapat data pasien terdaftar " />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  buttonAll: {
    color: 'black',
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 3,
    borderWidth: 2,
    marginRight: 20,
    borderColor: 'green',
    backgroundColor: 'green',
  },
  whiteText: {
    color: 'white',
  },
});

export default KartuIdentitas;
