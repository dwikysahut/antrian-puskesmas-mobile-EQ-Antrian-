import React, {useState} from 'react';
import {Platform} from 'react-native';
import storage from '@react-native-firebase/storage';
import {dialogFeedback} from '../../../utils/functionHelper';
import {ALERT_TYPE} from 'react-native-alert-notification';

const useImageUpload = ({setShowModalUpload}) => {
  const [progress, setProgress] = useState(0);
  const [imageFile, setImageFile] = useState(null);

  const uploadImageHandler = async (nik, fnSaveToDB) => {
    console.log(imageFile);
    const {uri} = imageFile;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const storageRef = storage().ref(`/images/foto-kartu-identitas-${nik}`);

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
          () => setShowModalUpload(false),
          null,
        );
      },
      snapshot => {
        if (snapshot.state == 'success') {
          fnSaveToDB(storageRef);
        }
      },
    );
  };
  return {
    uploadImageHandler,
    progress,
    imageFile,
    setImageFile,
  };
};
export default useImageUpload;
