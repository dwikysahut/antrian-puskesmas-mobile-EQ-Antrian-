import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModalTicket from './ModalTicket';
import {
  dateOnlyConvert,
  renderStatusAntrianColor,
} from '../../../../../utils/functionHelper';
import {statusAntrian, statusKehadiran} from '../../../../../utils/DATA';
const ShimmerAntrian = ({}) => {
  return (
    <TouchableOpacity style={styles.containerItem}>
      <View style={styles.inner}>
        <View style={styles.imageWrapper}>
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontWeight: 'bold',
              marginTop: 10,
              backgroundColor: 'darkgrey',
            }}
          />
        </View>
        <View style={styles.textWrapper}>
          <View style={styles.topTextWrapper}>
            <Text
              style={{
                fontSize: 19,
                flex: 1,
                color: 'black',
                fontWeight: '600',
                backgroundColor: 'darkgrey',
              }}
            />
            <Text
              style={{
                fontSize: 15,
                flex: 1,
                lineHeight: 5,
                color: 'black',
                fontWeight: '600',
                backgroundColor: 'darkgrey',
              }}
            />
          </View>
          <View>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                lineHeight: 5,
                padding: 3,
                paddingHorizontal: 10,
                borderRadius: 5,
                backgroundColor: 'darkgrey',
                fontSize: 15,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              backgroundColor: 'darkgrey',
            }}>
            <Text
              style={{
                width: 200,
                textAlign: 'center',
                color: 'white',

                padding: 3,
                paddingHorizontal: 10,
                borderRadius: 5,
                backgroundColor: 'darkgrey',
                fontSize: 15,
              }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ShimmerAntrian;

const styles = StyleSheet.create({
  containerItem: {
    marginTop: 8,

    padding: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    backgroundColor: 'white',
    elevation: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    justifyContent: 'center',
  },
  inner: {
    flexDirection: 'row',
  },
  topTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'darkgrey',
    alignItems: 'center',
  },
  textWrapper: {
    padding: 8,
    flex: 2,
  },
  scanBtn: {
    padding: 8,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: 'darkgreen',
  },
});
