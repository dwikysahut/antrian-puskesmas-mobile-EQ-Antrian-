import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';

import ItemPoli from './ItemPoli';

const ListPoli = ({data, onPressItemHandler}) => {
  console.log(data);
  const _renderItem = ({item}) => {
    return <ItemPoli data={item} />;
  };
  return (
    <View style={{flex: 1, marginVertical: 8}}>
      {data.map(item => (
        <ItemPoli
          data={item}
          key={item.id_praktek}
          onPressItemHandler={onPressItemHandler}
        />
      ))}
    </View>
  );
};

export default ListPoli;
