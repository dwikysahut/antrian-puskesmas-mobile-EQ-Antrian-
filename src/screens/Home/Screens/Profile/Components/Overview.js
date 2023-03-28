import React from 'react';
import {Image, View, Dimensions, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Overview = ({nama, nik, email, jenisKelamin}) => {
  return (
    <View style={styles.innerWrapper}>
      <View style={styles.imageWrapper}>
        <View
          style={{
            borderRadius: 250,
            borderWidth: 1,
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'white',
          }}>
          <MaterialCommunityIcons
            name={jenisKelamin === 'Perempuan' ? 'face-woman' : 'face-man'}
            size={90}
            color="black"
          />
        </View>
      </View>
      <View style={styles.textWrapper}>
        <Text
          style={{...styles.overviewText, fontWeight: 'bold', fontSize: 21}}>
          {nama}
        </Text>
        <Text style={{...styles.overviewText, fontWeight: '500', fontSize: 19}}>
          {nik}
        </Text>
        <Text
          style={{
            ...styles.overviewText,
            fontWeight: 'bold',
            fontSize: 17,
            color: 'darkgrey',
          }}>
          {email}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 2,
  },
  overviewText: {
    color: 'white',
    marginVertical: 2,
  },
});
export default Overview;
