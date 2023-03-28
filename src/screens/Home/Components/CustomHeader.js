import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import {Colors} from 'react-native/Libraries/NewAppScreen';

const CustomHeader = ({title, onPressHandler}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onPressHandler}>
          <FontAwesome name="refresh" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    top: 0,

    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 21,
    color: 'black',
    fontWeight: '700',
  },
});

export default CustomHeader;
