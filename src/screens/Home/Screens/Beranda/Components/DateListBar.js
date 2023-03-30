import {ScrollView} from 'react-native';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {color} from '../../../../../utils/Color';

const DateListBar = ({dateValue, onChangeDateHandler, dateListValue}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginTop: 8,
          marginBottom: 12,
          fontWeight: 'bold',
          fontSize: 18,
          color: 'white',
        }}>
        {`${dateValue.monthName} ${dateValue.year}`}
      </Text>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
          marginEnd: 10,
        }}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            padding: 5,
            borderColor: 'white',
            borderWidth: 0.8,
          }}
          showsHorizontalScrollIndicator={true}
          style={styles.dateWrapper}>
          {dateListValue.map(item => (
            <TouchableOpacity
              onPress={() => {
                onChangeDateHandler(item);
              }}
              style={[
                styles.dateItem,
                {
                  backgroundColor:
                    dateValue.date === item.date ? '#639375' : 'white',
                },
              ]}
              key={item.key}>
              <Text
                style={{
                  color: dateValue.date === item.date ? 'white' : 'darkgreen',
                  fontWeight: 'bold',
                }}>
                {item.dayName}
              </Text>
              <Text
                style={{
                  color: dateValue.date === item.date ? 'white' : 'darkgreen',
                }}>
                {item.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FontAwesome name="calendar" size={30} color="darkgrey" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 20,
    marginTop: 10,
    padding: 5,
    zIndex: 4,

    backgroundColor: color.main,
  },
  dateWrapper: {
    marginHorizontal: 10,

    borderRadius: 5,
    marginVertical: 10,
  },
  dateItem: {
    borderWidth: 0.8,
    flex: 1,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'darkgrey',

    borderRadius: 5,
  },
});

export default DateListBar;
