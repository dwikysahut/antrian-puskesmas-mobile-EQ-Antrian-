import React from 'react';
import {color} from '../utils/Color';

import {ActivityIndicator, StyleSheet, View} from 'react-native';
const LoaderIndicator = () => {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color={color.main} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default LoaderIndicator;
