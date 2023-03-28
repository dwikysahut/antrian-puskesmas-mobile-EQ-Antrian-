import React from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import styles from './style';

import {ScrollView} from 'native-base';

const TextContent = ({title, body}) => {
  return (
    <View style={styles.textWrapper}>
      {title === null ? <></> : <Text style={styles.title}>{title}</Text>}
      <Text style={styles.bodyText}>{body}</Text>
    </View>
  );
};

export default TextContent;
