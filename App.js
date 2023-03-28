/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';

import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';

import Splash from './src/screens/SplashScreen/SplashScreen';
import Intro from './src/screens/IntroSlider/IntroSlider';
import Login from './src/screens/Auth/Login/Login';
import Register from './src/screens/Auth/Register/Register';
import LupaPassword from './src/screens/Auth/LupaPassword/LupaPassword';
import EmailVerification from './src/screens/Auth/EmailVerification/EmailVerification';
import Home from './src/screens/Home/Home';
import DetailInformasi from './src/screens/Home/Screens/DetailInformasi/DetailInformasi';
import DetailPoli from './src/screens/Home/Screens/DetailPoli/DetailPoli';
import ContactUs from './src/screens/Home/Screens/ContactUs/ContactUs';
import AboutApps from './src/screens/Home/Screens/AboutApps/AboutApps';
import EditProfile from './src/screens/Home/Screens/EditProfile/EditProfile';
import KartuIdentitas from './src/screens/Home/Screens/KartuIdentitas/KartuIdentitas';
import DetailKartuIdentitas from './src/screens/Home/Screens/DetailKartuIdentitas/DetailKartuIdentitas';
import Scanner from './src/screens/Home/Screens/Scanner.js/Scanner';
import HomePendaftaran from './src/screens/Home/Screens/PendaftaranBaru/HomePendaftaran';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator initialRoute="Splash">
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Intro"
                component={Intro}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="LupaPassword"
                component={LupaPassword}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="EmailVerify"
                component={EmailVerification}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DetailInformasi"
                component={DetailInformasi}
                options={{title: 'Detail'}}
              />
              <Stack.Screen
                name="DetailPoli"
                component={DetailPoli}
                options={{
                  title: 'Informasi',
                  headerTransparent: {
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    zIndex: 100,
                    top: 0,
                    left: 0,
                    right: 0,
                  },
                  headerTintColor: 'white',
                }}
              />
              <Stack.Screen
                name="ContactUs"
                component={ContactUs}
                options={{title: 'Hubungi Kami'}}
              />
              <Stack.Screen
                name="AboutApps"
                component={AboutApps}
                options={{title: 'Tentang Aplikasi'}}
              />
              <Stack.Screen
                name="HomePendaftaran"
                component={HomePendaftaran}
                options={{title: 'Pendaftaran Antrian'}}
              />
              <Stack.Screen
                name="KartuIdentitas"
                component={KartuIdentitas}
                options={{title: 'Kartu Identitas'}}
              />
              <Stack.Screen
                name="DetailKartuIdentitas"
                component={DetailKartuIdentitas}
                options={{title: 'Detail Kartu Identitas'}}
              />
              <Stack.Screen
                name="Scanner"
                component={Scanner}
                options={{title: 'Scanner'}}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                  title: 'Informasi Saya',
                  headerStyle: {
                    backgroundColor: '#2a6049',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0, // remove shadow on iOS
                  },

                  headerTintColor: 'white',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
