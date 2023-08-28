/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {color} from '../../../../../utils/Color';
import {statusAntrian, statusKehadiran} from '../../../../../utils/DATA';
import {dateConvert} from '../../../../../utils/functionHelper';

const Item = ({data, onClickHandler, onClickAksiHandler}) => {
  console.log(onClickAksiHandler);
  const renderTextNotification = item => {
    console.log(item);
    if (item.jenis_notifikasi == 0) {
      return (
        <Text style={styles.text}>
          {item.text_notifikasi}
          <Text style={{fontWeight: 'bold'}}> {item.id_antrian}</Text>{' '}
          dinyatakan{' '}
          <Text
            style={{
              color: item.status_hadir == 1 ? 'darkgreen' : 'darkred',
              fontWeight: 'bold',
            }}>
            {statusKehadiran[item.status_hadir]}
          </Text>
        </Text>
      );
    }
    if (item.jenis_notifikasi == 1) {
      return (
        <Text style={styles.text}>
          {item.text_notifikasi}
          <Text style={{fontWeight: 'bold'}}>
            {' '}
            {item.id_antrian}
          </Text> adalah{' '}
          <Text
            style={{
              color: 'darkgold',
              fontWeight: 'bold',
            }}>
            {statusAntrian[item.status_antrian - 1]}
          </Text>
        </Text>
      );
    }
    if (item.jenis_notifikasi == 2) {
      if (item.aksi == 0) {
        return (
          <View>
            <Text style={styles.text}>
              Nomor antrian
              <Text style={{fontWeight: 'bold'}}>
                {' '}
                {/* {item.user_id.substring(0, 2)}***********{' '} */}
                {item.nomor_antrian}
              </Text>{' '}
              Ingin menukarkan posisi antrian miliknya yaitu antrian ke{' '}
              <Text style={{fontWeight: 'bold'}}>{item.urutan}</Text> di{' '}
              {item.nama_poli} dengan posisi antrian anda yaitu antrian ke{' '}
              <Text style={{fontWeight: 'bold'}}>{item.urutan_tujuan}</Text>
            </Text>

            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => onClickAksiHandler(item.id_notifikasi, 1)}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                  Setuju
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onClickAksiHandler(item.id_notifikasi, 2)}
                style={[
                  styles.button,
                  {
                    backgroundColor: 'white',
                    borderColor: 'darkgreen',
                    borderWidth: 1,
                  },
                ]}>
                <Text
                  style={{
                    color: 'darkgreen',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Tolak
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        return (
          <Text style={styles.text}>
            {item.text_notifikasi}
            <Text style={{fontWeight: 'bold'}}>
              {' '}
              {item.id_antrian}
            </Text> dengan{' '}
            <Text style={{fontWeight: 'bold'}}> {item.id_antrian_tujuan}</Text>
            {item.aksi == 1 ? (
              <Text
                style={{
                  color: 'darkgreen',
                  fontWeight: 'bold',
                }}>
                {' '}
                Diterima
              </Text>
            ) : (
              <Text
                style={{
                  color: 'darkred',
                  fontWeight: 'bold',
                }}>
                {' '}
                Ditolak
              </Text>
            )}
          </Text>
        );
      }
    }
  };
  // const renderTextNotif = texts => {
  //   const reg = new RegExp('^[0-9]+$');
  //   let resultText = [];
  //   const resultWrapper = <Text>{resultText}</Text>;
  //   const arrTexts = texts.split(' ');
  //   for (let i = 0; i < arrTexts.length; i++) {
  //     if (i == 2 || i == 3) {
  //       //apabila angka
  //       if (reg.test(arrTexts[i])) {
  //         console.log(arrTexts[i]);
  //         resultText.push(
  //           <Text key={i} style={{fontWeight: 'bold', color: 'darkgreen'}}>
  //             {arrTexts[i]}{' '}
  //           </Text>,
  //         );
  //       } else {
  //         resultText.push(arrTexts[i] + ' ');
  //       }
  //     } else {
  //       if(arrTexts)
  //       resultText.push(arrTexts[i] + ' ');
  //     }
  //   }
  //   // console.log(resultText);
  //   return resultText;
  // };
  return (
    <TouchableOpacity
      onPress={() => onClickHandler(data)}
      style={
        data.is_opened === 0
          ? [styles.wrapper, {backgroundColor: color.third}]
          : styles.wrapper
      }>
      {/* jenis notifikasi 0 untuk status kehadiran, 1 untuk status antrian dan 2 untuk request penukaran */}

      {renderTextNotification(data)}

      <Text
        style={{
          textAlign: 'right',
          marginTop: 5,
          fontSize: 12,
          color: 'black',
        }}>
        {dateConvert(data.created_at)}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderBottomLeftRadius: 30,

    borderTopRightRadius: 30,

    elevation: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: color.main,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    padding: 10,
    lineHeight: 25,
  },
});

export default Item;
