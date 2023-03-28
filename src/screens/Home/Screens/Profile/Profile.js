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
  Button,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ScrollView} from 'native-base';
import Overview from './Components/Overview';
import ProfileMenu from './Components/ProfileMenu';

import WavyBackground from 'react-native-wavy-background';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUserActionCreator} from '../../../../redux/actions/userAction';
import {logout} from '../../../../utils/functionHelper';
// import Icon from 'react-native-vector-icons/Ionicons';
const waveHeight = Dimensions.get('window').height * 0.1;
const data = {
  nama: 'dwiky',
  nik: '1231231241242124',
  email: 'dwikysahut@gmail.com',
  jenisKelamin: 'Laki-laki',
};
const Profile = props => {
  const dataUser = useSelector(({reducerUser}) => reducerUser.data);
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onPressHubungiHandler = () => {
    navigation.navigate('ContactUs');
  };
  const onPressKartuIdentitasHandler = () => {
    navigation.navigate('KartuIdentitas');
  };
  const onPressKeluarHandler = async () => {
    Alert.alert(
      'Konfirmasi',
      'Yakin untuk Logout ?',
      [
        {
          text: 'Batal',

          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () =>
            await logout(
              dataUser.refreshToken,
              setIsLoading,
              dispatch,
              logoutUserActionCreator,
              props.navigation,
            ),
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  const onPressSelengkapnyaHandler = () => {
    navigation.navigate('EditProfile');
  };
  const onPressTentangHandler = () => {
    navigation.navigate('AboutApps');
  };
  useEffect(() => {
    if (dataUser.isRejectedRefreshToken) {
      logout(
        props.dataUser.refreshToken,
        setIsLoading,
        dispatch,
        logoutUserActionCreator,
        props.navigation,
      );
    }
  }, [dataUser.isRejectedRefreshToken]);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: -600,
          right: 0,
          transform: [{rotateY: '180deg'}],

          zIndex: 0,
        }}>
        <WavyBackground
          height={waveHeight}
          width={35}
          amplitude={5}
          frequency={30}
          offset={60}
          color="#2a6049"
        />
      </View>
      <Overview
        nama={dataUser.nama_user}
        nik={dataUser.user_id}
        email={dataUser.email}
        jenisKelamin={dataUser.jenis_kelamin}
      />
      {/* <Button style={styles.buttonAll} title="asda" /> */}
      <TouchableOpacity
        style={styles.buttonAll}
        onPress={onPressSelengkapnyaHandler}>
        <Text style={styles.whiteText}>Selengkapnya</Text>
      </TouchableOpacity>
      <ProfileMenu
        onPressHubungiHandler={onPressHubungiHandler}
        onPressKartuIdentitasHandler={onPressKartuIdentitasHandler}
        onPressTentangHandler={onPressTentangHandler}
        onPressKeluarHandler={onPressKeluarHandler}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonAll: {
    color: 'black',
    marginTop: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 20,
    borderColor: '#004E00',
    backgroundColor: 'white',
  },
  whiteText: {
    color: '#004E00',
    fontWeight: 'bold',
  },
});
export default Profile;
