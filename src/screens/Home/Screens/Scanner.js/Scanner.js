import React, {Component, Fragment, useState} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {getAntrianById, putStatusAntrian} from '../../../../utils/http';
import {
  alertConfirmation,
  authRefreshToken,
  dialogCallback,
  errorFetchWithFeedback,
  logout,
  showToast2,
} from '../../../../utils/functionHelper';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
} from 'react-native-alert-notification';
import {useDispatch, useSelector} from 'react-redux';
import {
  logoutUserActionCreator,
  refreshTokenActionCreator,
} from '../../../../redux/actions/userAction';
import {statusAntrian, statusKehadiran} from '../../../../utils/DATA';
import LoaderIndicator from '../../../../Components/LoaderIndicator';
import LoaderModal from '../../../../Components/LoaderModal';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {BaseToast, ErrorToast} from 'react-native-toast-message';
const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#6dad6d',
        backgroundColor: '#303030',
      }}
      contentContainerStyle={{paddingVertical: 8}}
      text1Style={{
        fontSize: 17,
        color: 'white',
      }}
      text2Style={{
        fontSize: 15,
        color: 'white',
      }}
      text2NumberOfLines={3}
    />
  ),

  error: props => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#ea4037',
        backgroundColor: '#303030',
        height: 80,
      }}
      text1Style={{
        fontSize: 17,
        color: 'white',
      }}
      text2NumberOfLines={3}
      text2Style={{
        fontSize: 15,
        color: 'white',
      }}
    />
  ),
};
const ScanScreen = props => {
  const dispatch = useDispatch();
  const [type] = useState(props.route.params?.type);
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataAntrianPasien] = useState(props.route.params?.data);
  const dataUser = useSelector(({reducerUser}) => reducerUser.data);

  const scanAntrianHandler = (id_antrian, formData) => {
    console.log(formData);
    setIsShow(true);
    putStatusAntrian(id_antrian, formData, dataUser.token)
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          showToast2(
            ALERT_TYPE.SUCCESS,
            'Success',
            'Status pada antrian berhasil di ubah',
          );
          // dialogCallback(
          //   'Success',
          //   'Status pada antrian berhasil di ubah',
          //   true,
          //   ALERT_TYPE.SUCCESS,
          // );
          if (dataUser.role === 3) {
            setTimeout(() => {
              props.navigation.navigate('Antrian');
            }, 3000);
          }
        } else if (response.status == 204) {
          showToast2(ALERT_TYPE.DANGER, 'Oopss..', 'Poli sedang penuh');

          // dialogCallback(
          //   'Oops..',
          //   'Poli sedang penuh',
          //   true,
          //   ALERT_TYPE.DANGER,
          // );
        }
      })
      .catch(error => {
        errorFetchWithFeedback(
          error,
          props.navigation.navigate,
          3000,
          () =>
            logout(
              dataUser.refreshToken,
              null,
              dispatch,
              logoutUserActionCreator,
              props.navigation,
            ),
          () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
        );
      })
      .finally(() => {
        setIsShow(false);
      });
  };
  const onSuccess = async e => {
    try {
      //untuk role user pasien
      if (dataUser.role == 3) {
        //melakukan parse data qr code berupa status_antrian selanjutnya
        if (dataAntrianPasien) {
          const dataAntrian = JSON.parse(e.data);
          if (dataAntrian.data?.id_antrian) {
            return showToast2(ALERT_TYPE.DANGER, 'Oopss..', 'Akses Ditolak');
          }
          console.log(dataAntrianPasien);
          console.log(dataAntrian);
          if (dataAntrianPasien.id_praktek != dataAntrian.data?.id_praktek) {
            return showToast2(
              ALERT_TYPE.DANGER,
              'Oopss..',
              'Poli tujuan tidak sesuai dengan tiket anda',
            );

            // return dialogCallback(
            //   'Oops...',
            //   'Poli tujuan tidak sesuai dengan tiket anda',
            //   true,
            //   ALERT_TYPE.DANGER,
            // );
          } else if (
            dataAntrianPasien.status_antrian ==
              dataAntrian.data?.status_antrian &&
            dataAntrianPasien.status_antrian > 5
          ) {
            return showToast2(
              ALERT_TYPE.WARNING,
              'Oopss..',
              'Status Antrian sudah diubah',
            );

            // return dialogCallback(
            //   'Oops...',
            //   'Status Antrian sudah diubah',
            //   true,
            //   ALERT_TYPE.WARNING,
            // );
          }
          //saat status antrian di bawah 4 (sebelum menunggu pelayanan)
          else if (dataAntrianPasien.status_antrian < 4) {
            return showToast2(
              ALERT_TYPE.DANGER,
              'Oopss..',
              'Mohon untuk menyelesaikan proses administrasi terlebih dahulu..',
            );

            // return dialogCallback(
            //   'Oops...',
            //   'Mohon untuk menyelesaikan proses administrasi terlebih dahulu..',
            //   true,
            //   ALERT_TYPE.DANGER,
            // );
          }
          scanAntrianHandler(dataAntrianPasien.id_antrian, {
            status_antrian:
              dataAntrianPasien.status_antrian == 4
                ? dataAntrian.data?.status_antrian
                : parseInt(dataAntrian.data?.status_antrian, 10) + 1,
          });
        }
      }
      //role petugas
      else {
        const dataQr = JSON.parse(e.data);
        console.log(dataQr);

        try {
          const dataFetch = await getAntrianById(dataQr.data.id_antrian);
          const dataAntrian = dataFetch.data;

          if (dataAntrian.data?.id_antrian) {
            //mengubah status antrian menjadi status saat ini + 1
            const formData =
              type == 'status_antrian'
                ? {status_antrian: dataAntrian.data?.status_antrian + 1}
                : {status_hadir: 1};

            //ubah status antrian
            if (type == 'status_antrian') {
              if (dataAntrian.data?.status_antrian < 4) {
                return dialogCallback(
                  'Oops...',
                  'Mohon untuk menyelesaikan proses administrasi terlebih dahulu..',
                  true,
                  ALERT_TYPE.DANGER,
                );
              }
              alertConfirmation(
                `Ubah Status Antrian menjadi ${
                  statusAntrian[parseInt(dataAntrian.data?.status_antrian, 10)]
                } ?`,
                () => {
                  scanAntrianHandler(dataAntrian.data.id_antrian, formData);
                },
              );
            }
            //ubah status hadir antrian menjadi 1
            else if (type == 'status_hadir') {
              alertConfirmation(
                `Ubah Status Kehadiran Antrian menjadi ${statusKehadiran[1]} ?`,
                () => {
                  scanAntrianHandler(dataAntrian.data.id_antrian, formData);
                },
              );
            }
          } else {
            dialogCallback('Oopss...', 'Scan Gagal..', true, ALERT_TYPE.DANGER);
          }
        } catch (error) {
          console.log(error);
        }
      }
      console.log(type);
    } catch (error) {
      console.log(error);
      dialogCallback('Oopss...', 'Scan Gagal..', true, ALERT_TYPE.DANGER);
    }
  };

  return (
    <>
      <QRCodeScanner
        onRead={onSuccess}
        reactivate={true}
        reactivateTimeout={5000}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        // topContent={

        // }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
      <Toast config={toastConfig} />
      <LoaderModal modalVisible={isShow} setModalVisible={setIsShow} />
    </>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'darkgreen',
  },
  buttonTouchable: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
export default ScanScreen;
