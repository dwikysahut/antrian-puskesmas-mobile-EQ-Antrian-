/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useState} from 'react';
import {View, useWindowDimensions, Text, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import PendaftaranBaru from './PendaftaranBaru/PendaftaranBaru';
import PendaftaranLama from './PendaftaranLama/PendaftaranLama';
import {useRoute} from '@react-navigation/native';
import {AlertNotificationRoot} from 'react-native-alert-notification';

// const renderScene = SceneMap({
//   PendaftaranBaru: PendaftaranBaru,
//   PendaftaranLama: PendaftaranLama,
// });

const renderTabBar = props => {
  return (
    <TabBar
      {...props}
      renderLabel={({route, focused}) => (
        <Text
          style={{
            color: 'darkgreen',
            margin: 8,
            fontSize: 15,

            fontWeight: '700',
          }}>
          {route.title}
        </Text>
      )}
      pressColor="darkgreen"
      indicatorStyle={{backgroundColor: 'darkgreen', height: 3}}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default function HomePendaftaran({route}) {
  const layout = useWindowDimensions();
  const routeNav = useRoute();
  const [index, setIndex] = useState(0);
  const [dataParams, setDataParams] = useState(null);
  const [routes] = useState([
    {key: 'PendaftaranBaru', title: 'Pasien Baru'},
    {key: 'PendaftaranLama', title: 'Pasien Lama'},
  ]);

  const onChangeIndex = data => {
    setDataParams(data);
    //pindah ke tab berikutnya / pasien lama
  };

  useEffect(() => {
    if (dataParams !== null) {
      setIndex(1);
    }
  }, [dataParams]);
  const renderScene = ({route}) => {
    // console.log(routeNav);

    switch (route.key) {
      case 'PendaftaranBaru':
        return (
          <PendaftaranBaru
            params={routeNav.params ? routeNav.params : null}
            onChangeIndex={onChangeIndex}
          />
        );

      case 'PendaftaranLama':
        return (
          <PendaftaranLama
            params={routeNav.params ? routeNav.params : null}
            dataParams={dataParams}
          />
        );
      default:
        return null;
    }
  };
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{width: layout.width}}
    />
  );
}
