import React, {useEffect} from 'react';
import {
  Button,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const useCameraPermission = () => {
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App memerlukan akses kamera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const grantedGallery = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'App Gallery Permission',
          message: 'App membutuhkan akses ke galeri anda',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (
        granted === PermissionsAndroid.RESULTS.GRANTED &&
        grantedGallery === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Camera permission given');
        // launchCamera(
        //   {mediaType: 'photo', saveToPhotos: true},
        //   setPickerResponse,;
        // );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return {
    requestCameraPermission,
  };
};
export default useCameraPermission;
