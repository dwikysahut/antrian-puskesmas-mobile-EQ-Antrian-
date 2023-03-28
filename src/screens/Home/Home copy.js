// import {Text} from 'native-base';
// import React from 'react';

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import Login from '../Auth/Login/Login';
// import Beranda from './Screens/Beranda/Beranda';
// import Informasi from './Screens/Informasi/Informasi';
// import Profile from './Screens/Profile/Profile';
// import Notifikasi from './Screens/Notifikasi/Notifikasi';
// import HomeAntrian from './Screens/Antrian/HomeAntrian';
// import TiketAntrian from './Screens/Petugas/TiketAntrian/TiketAntrian';
// import KelolaAntrian from './Screens/Petugas/KelolaAntrian/KelolaAntrian';

// import DetailInformasi from './Screens/DetailInformasi/DetailInformasi';
// import DetailPoli from './Screens/DetailPoli/DetailPoli';
// import ContactUs from './Screens/ContactUs/ContactUs';
// import AboutApps from './Screens/AboutApps/AboutApps';
// import EditProfile from './Screens/EditProfile/EditProfile';
// import KartuIdentitas from './Screens/KartuIdentitas/KartuIdentitas';
// import DetailKartuIdentitas from './Screens/DetailKartuIdentitas/DetailKartuIdentitas';
// import Scanner from './Screens/Scanner.js/Scanner';
// import HomePendaftaran from './Screens/PendaftaranBaru/HomePendaftaran';

// import {color} from '../../utils/Color';
// import {useSelector} from 'react-redux';
// import {createStackNavigator} from '@react-navigation/stack';

// const Stack = createStackNavigator();

// const Tab = createBottomTabNavigator();
// // import Icon from 'react-native-vector-icons/Ionicons';

// const Home = () => {
//   const dataUser = useSelector(({reducerUser}) => reducerUser.data);
//   return (
//     <Tab.Navigator
//       header
//       screenOptions={{
//         tabBarActiveTintColor: color.main,
//         tabBarStyle: {height: 55},
//       }}
//       initialRouteName={Beranda}>
//       <Tab.Screen
//         name="Beranda"
//         component={BerandaStack}
//         options={({route}) => ({
//           tabBarVisible: getTabBarVisibility(route),
//           tabBarIcon: ({color, size}) => (
//             <FontAwesome name="home" color={color} size={30} />
//           ),
//           headerShown: false,
//         })}
//       />
//       <Tab.Screen
//         name="Informasi"
//         component={InformasiStack}
//         options={{
//           tabBarIcon: ({color, size}) => (
//             <FontAwesome name="newspaper-o" color={color} size={30} />
//           ),
//           headerShown: false,
//         }}
//       />
//       {dataUser?.role > 2 ? (
//         <Tab.Screen
//           name="Antrian"
//           component={AntrianStack}
//           options={{
//             tabBarIcon: ({color, size}) => (
//               <FontAwesome name="ticket" color={color} size={40} />
//             ),
//             title: 'Antrian',
//             headerShown: false,
//           }}
//         />
//       ) : (
//         <Tab.Screen
//           name="TiketAntrian"
//           component={TiketAntrian}
//           options={{
//             tabBarIcon: ({color, size}) => (
//               <FontAwesome name="ticket" color={color} size={40} />
//             ),
//             title: 'Tiket Antrian',
//           }}
//         />
//       )}
//       {dataUser?.role > 2 ? (
//         <Tab.Screen
//           name="Notifikasi"
//           component={NotifikasiStack}
//           options={{
//             tabBarIcon: ({color, size}) => (
//               <Ionicons name="notifications-outline" color={color} size={30} />
//             ),
//             tabBarBadge: 3,
//             headerShown: false,
//           }}
//         />
//       ) : (
//         <Tab.Screen
//           name="AntrianAdmin"
//           component={KelolaAntrian}
//           options={{
//             tabBarIcon: ({color, size}) => (
//               <MaterialCommunityIcons
//                 name="human-queue"
//                 color={color}
//                 size={30}
//               />
//             ),
//             title: 'Antrian',
//           }}
//         />
//       )}

//       <Tab.Screen
//         name="Profile"
//         component={ProfileStack}
//         options={{
//           tabBarIcon: ({color, size}) => (
//             <Ionicons name="person" color={color} size={30} />
//           ),
//           headerStyle: {
//             backgroundColor: '#2a6049',
//             elevation: 0,
//             shadowOpacity: 0,
//             borderBottomWidth: 0,
//           },
//           headerTitleStyle: {
//             color: 'white',
//           },
//           headerShown: false,
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// const BerandaStack = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName={Beranda}
//       screenOptions={{headerMode: 'none'}}>
//       <Stack.Screen
//         name="Beranda"
//         component={Beranda}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="DetailPoli"
//         component={DetailPoli}
//         options={{
//           title: 'Informasi',
//           headerTransparent: {
//             position: 'absolute',
//             backgroundColor: 'transparent',
//             zIndex: 100,
//             top: 0,
//             left: 0,
//             right: 0,
//           },
//           headerTintColor: 'white',
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
// const InformasiStack = () => {
//   return (
//     <Stack.Navigator initialRouteName={Informasi}>
//       <Stack.Screen
//         name="Informasi"
//         component={Informasi}
//         options={{title: 'Informasi'}}
//       />
//       <Stack.Screen
//         name="DetailInformasi"
//         component={DetailInformasi}
//         options={{title: 'Detail'}}
//       />
//     </Stack.Navigator>
//   );
// };
// const AntrianStack = () => {
//   return (
//     <Stack.Navigator initialRouteName={HomeAntrian}>
//       <Stack.Screen
//         name="Antrian"
//         component={HomeAntrian}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="HomePendaftaran"
//         component={HomePendaftaran}
//         options={{title: 'Pendaftaran Antrian'}}
//       />

//       <Stack.Screen
//         name="Scanner"
//         component={Scanner}
//         options={{title: 'Scanner'}}
//       />
//     </Stack.Navigator>
//   );
// };
// const NotifikasiStack = () => {
//   return (
//     <Stack.Navigator initialRouteName={Notifikasi}>
//       <Stack.Screen
//         name="Notifikasi"
//         component={Notifikasi}
//         options={{title: 'Notifikasi'}}
//       />
//     </Stack.Navigator>
//   );
// };
// const ProfileStack = () => {
//   return (
//     <Stack.Navigator initialRouteName={Profile}>
//       <Stack.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           title: 'Profile',
//           headerStyle: {
//             backgroundColor: '#2a6049',
//             elevation: 0,
//             shadowOpacity: 0,
//             borderBottomWidth: 0,
//           },
//           headerTitleStyle: {
//             color: 'white',
//           },
//         }}
//       />

//       <Stack.Screen
//         name="ContactUs"
//         component={ContactUs}
//         options={{title: 'Hubungi Kami'}}
//       />
//       <Stack.Screen
//         name="AboutApps"
//         component={AboutApps}
//         options={{title: 'Tentang Aplikasi'}}
//       />

//       <Stack.Screen
//         name="KartuIdentitas"
//         component={KartuIdentitas}
//         options={{title: 'Kartu Identitas'}}
//       />
//       <Stack.Screen
//         name="DetailKartuIdentitas"
//         component={DetailKartuIdentitas}
//         options={{title: 'Detail Kartu Identitas'}}
//       />

//       <Stack.Screen
//         name="EditProfile"
//         component={EditProfile}
//         options={{
//           title: 'Informasi Saya',
//           headerStyle: {
//             backgroundColor: '#2a6049',
//             elevation: 0, // remove shadow on Android
//             shadowOpacity: 0, // remove shadow on iOS
//           },

//           headerTintColor: 'white',
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
// const draft3 = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="DetailInformasi"
//         component={DetailInformasi}
//         options={{title: 'Detail'}}
//       />
//       <Stack.Screen
//         name="DetailPoli"
//         component={DetailPoli}
//         options={{
//           title: 'Informasi',
//           headerTransparent: {
//             position: 'absolute',
//             backgroundColor: 'transparent',
//             zIndex: 100,
//             top: 0,
//             left: 0,
//             right: 0,
//           },
//           headerTintColor: 'white',
//         }}
//       />
//       <Stack.Screen
//         name="ContactUs"
//         component={ContactUs}
//         options={{title: 'Hubungi Kami'}}
//       />
//       <Stack.Screen
//         name="AboutApps"
//         component={AboutApps}
//         options={{title: 'Tentang Aplikasi'}}
//       />
//       <Stack.Screen
//         name="HomePendaftaran"
//         component={HomePendaftaran}
//         options={{title: 'Pendaftaran Antrian'}}
//       />
//       <Stack.Screen
//         name="KartuIdentitas"
//         component={KartuIdentitas}
//         options={{title: 'Kartu Identitas'}}
//       />
//       <Stack.Screen
//         name="DetailKartuIdentitas"
//         component={DetailKartuIdentitas}
//         options={{title: 'Detail Kartu Identitas'}}
//       />
//       <Stack.Screen
//         name="Scanner"
//         component={Scanner}
//         options={{title: 'Scanner'}}
//       />
//       <Stack.Screen
//         name="EditProfile"
//         component={EditProfile}
//         options={{
//           title: 'Informasi Saya',
//           headerStyle: {
//             backgroundColor: '#2a6049',
//             elevation: 0, // remove shadow on Android
//             shadowOpacity: 0, // remove shadow on iOS
//           },

//           headerTintColor: 'white',
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
// const getTabBarVisibility = route => {
//   const routeName = route.state
//     ? route.state.routes[route.state.index].name
//     : '';
//   console.log(routeName);
//   if (
//     routeName === 'DetailInformasi' ||
//     routeName === 'Profile' ||
//     routeName === 'Beranda' ||
//     routeName === 'Informasi' ||
//     routeName === 'Antrian'
//   ) {
//     return true;
//   }

//   return false;
// };
// export default Home;
