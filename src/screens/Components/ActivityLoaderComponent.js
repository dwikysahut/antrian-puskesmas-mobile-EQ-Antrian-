import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {color} from '../../utils/Color';

const ActivityIndicatorComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color.main} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {},
});
export default ActivityIndicatorComponent;
