import React, {useState} from 'react';
import {View, useWindowDimensions, Text, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {color} from '../../../../utils/Color';
import ActiveAntrian from './Active/ActiveAntrian';
import HistoryAntrian from './History/HistoryAntrian';

// const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

// const SecondRoute = () => (
//   <View style={{flex: 1, backgroundColor: '#673ab7'}} />
// );

const renderScene = SceneMap({
  activeAntrian: ActiveAntrian,
  historiAntrian: HistoryAntrian,
});
const renderTabBar = props => {
  console.log(props);
  return (
    <TabBar
      {...props}
      renderLabel={({route, focused}) => (
        <Text
          style={{
            color: color.main,
            margin: 8,
            fontSize: 15,

            fontWeight: '700',
          }}>
          {route.title}
        </Text>
      )}
      pressColor={color.main}
      indicatorStyle={{backgroundColor: color.main, height: 3}}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default function HomeAntrian() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'activeAntrian', title: 'Antrian Saat Ini'},
    {key: 'historiAntrian', title: 'Riwayat Antrian'},
  ]);

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
