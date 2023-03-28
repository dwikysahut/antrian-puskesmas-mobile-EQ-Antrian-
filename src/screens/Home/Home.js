import {Text} from 'native-base';
import React, {useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
} from '../../redux/actions/userAction';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from 'react-native-alert-notification';
const Tab = createBottomTabNavigator();
// import Icon from 'react-native-vector-icons/Ionicons';

const Home = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

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
  const dataUser = useSelector(({reducerUser}) => reducerUser.data);
  // dataUser.role = 2;
  return (
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
              <Ionicons name="notifications-outline" color={color} size={30} />
            ),
            tabBarBadge: 3,
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
            backgroundColor: '#2a6049',
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
