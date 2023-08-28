import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Button,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import storage from '../../../../utils/firebaseConfig';
import storage from '@react-native-firebase/storage';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'native-base';
import UploadImage from '../../Components/UploadImage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {color} from '../../../../utils/Color';
import {putKartuIdentitasPasien, putPasien} from '../../../../utils/http';
import {useDispatch, useSelector} from 'react-redux';
import {
  authRefreshToken,
  dialogFeedback,
  errorFetchWithFeedback,
  logout,
} from '../../../../utils/functionHelper';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from 'react-native-alert-notification';
import {
  logoutUserActionCreator,
  refreshTokenActionCreator,
} from '../../../../redux/actions/userAction';
import useCameraPermission from '../../../../utils/useCameraPermission';
// import Icon from 'react-native-vector-icons/Ionicons';

const DetailKartuIdentitas = props => {
  // const {item} = route.params;
  const dataUser = useSelector(({reducerUser}) => reducerUser.data);
  const [item, setItem] = useState({});
  const [imageFile, setImageFile] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModalPicker, setShowModalPicker] = useState(false);
  const navigation = useNavigation();
  const {requestCameraPermission} = useCameraPermission();

  const dispatch = useDispatch();
  useEffect(() => {
    setItem(props.route.params.item);
    console.log(props.route.params.item);
  }, []);

  const uploadImageHandler = async () => {
    if (!imageFile.uri) {
      return dialogFeedback(
        'Perhatian',
        'Tidak ada Foto Dipilih',
        true,
        ALERT_TYPE.DANGER,
        3000,
        () => {},
        null,
      );
    }
    const {uri} = imageFile;

    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    //menjadikan nama file foto-kartu-identitas-NIK_PASIEN
    const storageRef = storage().ref(
      `/images/foto-kartu-identitas-${item.nik}`,
    );

    const task = storageRef.putFile(uploadUri);
    // set progress state
    task.on(
      'state_changed',
      snapshot => {
        console.log(snapshot);

        setProgress(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
      },
      error => {
        dialogFeedback(
          'Perhatian',
          'Foto gagal diunggah',
          true,
          ALERT_TYPE.DANGER,
          3000,
          () => setShowModal(false),
          null,
        );
      },
      snapshot => {
        if (snapshot.state == 'success') {
          //menyimpan URL pada Database
          saveToDB(storageRef);
        }
      },
    );
  };
  const saveToDB = async storageRef => {
    //mendapatkan download URL dari foto yang sudah diupload
    storageRef.getDownloadURL().then(async downloadUrl => {
      try {
        //proses update data pada database
        const response = await putKartuIdentitasPasien(
          item.nik,
          {
            url_foto_kartu_identitas: downloadUrl,
          },
          dataUser.token,
        );
        console.log(response);
        if (response.data.status == 200) {
          setShowModalPicker(false);
          setProgress(0);
          dialogFeedback(
            'Sukses',
            'Foto berhasil diunggah dan disimpan',
            true,
            ALERT_TYPE.SUCCESS,
            3000,
            () => setShowModal(false),
            null,
          );
          setItem(prevState => ({
            ...prevState,
            url_foto_kartu_identitas: downloadUrl,
          }));
        }
        setImageFile({});
      } catch (error) {
        errorFetchWithFeedback(
          error,
          navigation.navigate,
          3000,
          () =>
            logout(
              props.dataUser.refreshToken,
              setIsLoading,
              dispatch,
              logoutUserActionCreator,
              props.navigation,
            ),
          () =>
            authRefreshToken(
              dispatch,
              refreshTokenActionCreator,
              props.dataUser,
            ),
        );
      }
    });
  };

  const onCloseShowModal = () => {
    setImageFile({});
    setShowModal(!showModal);
  };

  const cameraHandler = async () => {
    const options = {
      noData: true,
      skipBackup: true,
      path: 'images',
    };

    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
      .then(response => {
        if (response === true) {
          //Open scanner
          launchCamera(options, response => {
            setShowModalPicker(false);

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              // alert(response.customButton);
            } else {
              if (response.assets[0].fileSize / 1024 / 1024 > 3) {
                dialogFeedback(
                  'Oops..',
                  'Ukuran File tidak boleh lebih dari 3 MB',
                  true,
                  ALERT_TYPE.DANGER,
                  3000,
                  () => setShowModal(false),
                  null,
                );
                return;
              }
              const source = {uri: response.uri};
              console.log('response', JSON.stringify(response));
              setImageFile({
                fileName: response.assets[0].fileName,
                size: response.assets[0].fileSize,
                uri: response.assets[0].uri,
              });
            }
          });
        } else if (response === false) {
          // Alert.alert('Aktifkan izin kamera di pengaturan.');
          requestCameraPermission();
        }
      })
      .catch(error => {
        // Alert.alert('Aktifkan izin kamera di pengaturan');
        requestCameraPermission();
        console.log(error);
      });
  };
  const galleryHandler = async () => {
    const options = {
      noData: true,
      skipBackup: true,
      path: 'images',
    };
    launchImageLibrary(options, response => {
      setShowModalPicker(false);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        // alert(response.customButton);
      } else {
        if (response.assets[0].fileSize / 1024 / 1024 > 3) {
          dialogFeedback(
            'Oops..',
            'Ukuran File tidak boleh lebih dari 3 MB',
            true,
            ALERT_TYPE.DANGER,
            3000,
            () => setShowModal(false),
            null,
          );
          return;
        }
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        setImageFile({
          fileName: response.assets[0].fileName,
          size: response.assets[0].fileSize,
          uri: response.assets[0].uri,
        });
      }
    });
  };
  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <Text
          style={{
            marginTop: 50,
            fontSize: 16,
            fontWeight: '400',
            color: 'black',
          }}>
          * Harap Upload Foto KTP Anda
        </Text>
        <View style={styles.imageWrapper}>
          {item.url_foto_kartu_identitas ? (
            <Image
              source={{uri: `${item.url_foto_kartu_identitas}`}}
              style={styles.image}
            />
          ) : (
            <Image
              source={require('../../../../../assets/images/foto_ktp_default.jpeg')}
              style={styles.image}
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.buttonGanti}
          onPress={() => setShowModal(true)}>
          <Text style={{color: color.main, fontSize: 18, fontWeight: 'bold'}}>
            Ubah
          </Text>
        </TouchableOpacity>
        <UploadImage
          showModal={showModal}
          image={imageFile}
          progress={progress}
          setShowModal={setShowModal}
          showModalPicker={showModalPicker}
          setShowModalPicker={setShowModalPicker}
          cameraHandler={cameraHandler}
          onSubmitHandler={uploadImageHandler}
          onCloseShowModal={onCloseShowModal}
          galleryHandler={galleryHandler}
        />
      </View>
    </AlertNotificationRoot>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: 'white',
  },
  imageWrapper: {
    marginTop: 15,
    borderRadius: 30,

    width: '90%',
    height: 250,
  },
  buttonGanti: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: 'darkgreen',
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  whiteText: {
    color: 'white',
  },
});

export default DetailKartuIdentitas;
