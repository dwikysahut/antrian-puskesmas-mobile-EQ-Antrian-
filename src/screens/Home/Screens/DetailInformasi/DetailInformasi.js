import React, {useState, useEffect} from 'react';
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
import {useSelector} from 'react-redux';

import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'native-base';
import TextContent from './Components/TextContent';
import {URL_BASE_IMAGE} from '../../../../utils/CONSTANT';

// import Icon from 'react-native-vector-icons/Ionicons';

const DetailInformasi = ({route, navigation}) => {
  const {id_informasi} = route.params;
  const [data, setData] = useState({});
  const dataInformasi = useSelector(
    ({reducerInformasi}) => reducerInformasi.data,
  );
  useEffect(() => {
    const dataInfo = dataInformasi.filter(
      item => item.id_informasi == id_informasi,
    )[0];

    console.log(dataInfo);

    setData(dataInfo);
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageWrapper}>
        {data.gambar === null ? (
          <Image
            source={{uri: `${URL_BASE_IMAGE}/no-image.jpeg`}}
            style={
              (styles.image,
              {height: '100%', width: '100%', resizeMode: 'contain'})
            }
          />
        ) : (
          <Image
            source={
              data.gambar?.toString().includes('https')
                ? {uri: `${data.gambar}`}
                : {uri: `${URL_BASE_IMAGE}/${data.gambar}`}
            }
            style={
              (styles.image,
              {height: '100%', width: '100%', resizeMode: 'stretch'})
            }
          />
        )}
      </View>
      <TextContent title={data.judul_informasi} body={data.isi_informasi} />
    </ScrollView>
  );
};

export default DetailInformasi;
