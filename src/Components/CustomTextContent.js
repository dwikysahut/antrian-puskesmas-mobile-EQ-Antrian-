import React from 'react';
import {color} from '../utils/Color';
import {Text} from 'native-base';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const CustomTextContent = ({text}) => {
  return (
    <View style={[styles.container]}>
      <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>
        {text}{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
});

export default CustomTextContent;
