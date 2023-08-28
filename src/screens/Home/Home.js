import {Text} from 'native-base';
import React, {useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import messaging from '@react-native-firebase/messaging';
import Login from '../Auth/Login/Login';
import Beranda from './Screens/Beranda/Beranda';
import Informasi from './Screens/Informasi/Informasi';
import Profile from './Screens/Profile/Profile';
import Notifikasi from './Screens/Notifikasi/Notifikasi';
import HomeAntrian from './Screens/Antrian/HomeAntrian';
import TiketAntrian from './Screens/Petugas/TiketAntrian/TiketAntrian';
import KelolaAntrian from './Screens/Petugas/KelolaAntrian/KelolaAntrian';
import {color} from '../../utils/Color';
import {connect, useDispatch, useSelector} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import {
  authRefreshToken,
  dialogFeedback,
  errorFetchWithFeedback,
  logout,
  showToast,
} from '../../utils/functionHelper';
import {
  logoutUserActionCreator,
  refreshTokenActionCreator,
  storeFcmTokenActionCreator,
} from '../../redux/actions/userAction';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from 'react-native-alert-notification';
import {useContext} from 'react';
import {SocketContext, runSocketInit, socketInit} from '../../context/socket';
import NotificationController from '../../utils/NotificationController';
import {AppState} from 'react-native';
import {getNotifikasiByUserActionCreator} from '../../redux/actions/notifikasiAction';

const Tab = createBottomTabNavigator();
// import Icon from 'react-native-vector-icons/Ionicons';

const Home = props => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const [appState, setAppState] = useState(AppState.currentState);
  const dataNotifikasi = useSelector(
    ({reducerNotifikasi}) => reducerNotifikasi.data,
  );
  const [isLoading, setIsLoading] = useState(false);

  const dataUser = useSelector(({reducerUser}) => reducerUser.data);
  useEffect(() => {
    if (props.isRejectedRefreshToken) {
      console.log('gagal');
      showToast(ALERT_TYPE.DANGER, 'Oops...', 'Silahkan Login kembali');
      // const timeOut = setTimeout(() => {
      logout(
        props.dataUser.refreshToken,
        setIsLoading,
        dispatch,
        logoutUserActionCreator,
        props.navigation,
      );

      // }, 2000);
      // return clearTimeout(timeOut);
    }
    console.log(props.isRejectedRefreshToken);
  }, [props.isRejectedRefreshToken]);

  // mulai cek state foreground / background
  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      console.log('App has come to the foreground!');
      dispatch(
        getNotifikasiByUserActionCreator(dataUser.user_id, dataUser.token),
      );
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
  useEffect(() => {
    if (socket == null) {
      runSocketInit();
    }
  }, [socket]);

  // akhir cek state foreground / background

  // dataUser.role = 2;
  useEffect(() => {
    socket().on(
      'server-postRequest',
      ({user_id_asal, user_id_tujuan, tanggal_periksa, id_praktek}) => {
        if (
          user_id_asal == dataUser.user_id ||
          user_id_tujuan == dataUser.user_id
        ) {
          dispatch(
            getNotifikasiByUserActionCreator(dataUser.user_id, dataUser.token),
          );
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
          dispatch(
            getNotifikasiByUserActionCreator(dataUser.user_id, dataUser.token),
          );
        }
      },
    );
  }, []);

  // untuk kirim notif
  const sendFcmToken = async () => {
    if (dataUser.role == 3) {
      try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log('token');
        console.log(token);
        socket().emit('user-connected', dataUser.user_id, token, 'mobile');
        dispatch(storeFcmTokenActionCreator(token));
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      await dispatch(
        getNotifikasiByUserActionCreator(dataUser.user_id, dataUser.token),
      );
    });

    sendFcmToken();
  }, []);
  return (
    <>
      <NotificationController />
      <Tab.Navigator
        initialRouteName={Beranda}
        screenOptions={{
          tabBarActiveTintColor: color.main,
          tabBarStyle: {height: 55},
        }}>
        <Tab.Screen
          name="Beranda"
          component={Beranda}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="home" color={color} size={30} />
            ),

            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Informasi"
          component={Informasi}
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="newspaper-o" color={color} size={30} />
            ),
          }}
        />
        {dataUser?.role > 2 ? (
          <Tab.Screen
            name="Antrian"
            component={HomeAntrian}
            options={{
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="ticket" color={color} size={40} />
              ),
              title: 'Antrian',
              headerShown: false,
            }}
          />
        ) : (
          <Tab.Screen
            name="TiketAntrian"
            component={TiketAntrian}
            options={{
              tabBarIcon: ({color, size}) => (
                <FontAwesome name="ticket" color={color} size={40} />
              ),
              title: 'Tiket Antrian',
            }}
          />
        )}
        {dataUser?.role > 2 ? (
          <Tab.Screen
            name="Notifikasi"
            component={Notifikasi}
            options={{
              tabBarIcon: ({color, size}) => (
                <Ionicons
                  name="notifications-outline"
                  color={color}
                  size={30}
                />
              ),
              tabBarBadge:
                dataNotifikasi.filter(item => item.is_opened == 0).length > 0
                  ? dataNotifikasi.filter(item => item.is_opened == 0).length
                  : undefined,
            }}
          />
        ) : (
          <Tab.Screen
            name="AntrianAdmin"
            component={KelolaAntrian}
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="human-queue"
                  color={color}
                  size={30}
                />
              ),
              title: 'Antrian',
            }}
          />
        )}

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="person" color={color} size={30} />
            ),
            headerStyle: {
              backgroundColor: color.main,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTitleStyle: {
              color: 'white',
            },
          }}
        />
      </Tab.Navigator>
    </>
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

export default connect(mapStateToProps, null)(Home);
