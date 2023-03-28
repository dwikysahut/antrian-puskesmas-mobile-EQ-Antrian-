import React, {useState} from 'react';
// import React, {Component, useState} from 'react';
import ProgressBar from 'react-native-animated-progress';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  TouchableOpacity,
  // KeyboardAvoidingView,
  //   Platform,
} from 'react-native';
// import Pencil from 'react-native-vector-icons/FontAwesome';
import ImageIcon from 'react-native-vector-icons/Entypo';
import {Item, Form, Button, Spinner} from 'native-base';

const UploadImage = ({
  image,
  showModal,
  setShowModal,
  showModalPicker,
  setShowModalPicker,
  isFill,
  progress,
  onCloseShowModal,
  cameraHandler,
  onSubmitHandler,
  galleryHandler,
}) => {
  const openUpload = async () => {
    const options = {
      noData: true,
      skipBackup: true,
      path: 'images',
    };
    // launchImageLibrary(options, response => {
    // if (!response.uri) {
    //     await    this.setState({ image: this.state.image }, () => { })
    // }
    // if (response.fileSize / 1024 / 1024 > 2) {
    //   this.setState({isImage: false});
    //   this.setState({image: this.state.image});
    //   Alert.alert("Image can't more than 2 mb,Image will not saved");
    //   setShowModal(false);
    //   return false;
    // }
    // if (response.uri) {
    //   let source = {
    //     name: 'image.jpg',
    //     size: response.fileSize,
    //     type: 'image/jpeg',
    //     uri: response.uri,
    //   };
    //   // this.setState({photo: response});
    //   console.log('asssss = ', response);
    //   //  const source = { uri: 'data:image/jpeg;base64,' + response.data};
    //   this.setState({
    //     image: source,
    //     checkErrorImage: false,
    //     isImage: true,
    //   });
    // }
    // });
  };

  //   const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.textTitle}>Upload Foto</Text>

          <View style={{justifyContent: 'center'}}>
            {image?.fileName ? (
              <Text>{image.fileName}</Text>
            ) : (
              <Text>Tidak ada foto dipilih</Text>
            )}
            {progress > 0 ? (
              <View style={{marginVertical: 10}}>
                <Text style={{marginVertical: 4, fontWeight: 'bold'}}>
                  Sedang Mengunggah....
                </Text>
                <ProgressBar
                  progress={progress}
                  height={7}
                  animated={true}
                  backgroundColor="#4a0072"
                />
              </View>
            ) : (
              <></>
            )}
          </View>
          <TouchableOpacity
            bordered
            style={styles.buttonImage}
            onPress={() => setShowModalPicker(true)}>
            <Text style={{textAlign: 'center'}}>Pilih Foto</Text>
          </TouchableOpacity>

          {/* {this.state.isLoading ? (
              <View>
                <Spinner color="black" />
              </View>
            ) : ( */}
          <TouchableHighlight
            style={styles.touchableStyle}
            onPress={onSubmitHandler}>
            <Text style={styles.textChange}>Submit</Text>
          </TouchableHighlight>
          {/* )} */}
          <TouchableOpacity
            style={{
              marginTop: 20,
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderWidth: 1,
              borderRadius: 5,
              width: '100%',
              alignItems: 'center',
              textAlign: 'center',
              borderColor: 'darkgreen',
            }}
            onPress={onCloseShowModal}>
            <Text style={styles.textCancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalPicker}
        onRequestClose={() => {
          setShowModalPicker(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalChooseView}>
            <Text style={{fontSize: 24, color: 'black'}}>Pilih Foto</Text>
            <TouchableOpacity
              style={styles.chooserButton}
              onPress={cameraHandler}>
              <Text style={{textAlign: 'center'}}>Ambil dari Kamera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chooserButton}
              onPress={galleryHandler}>
              <Text style={{textAlign: 'center'}}>Ambil dari Galeri</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'flex-end',
                width: '100%',
              }}>
              <TouchableOpacity
                style={{padding: 10}}
                onPress={() => setShowModalPicker(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {width: 300},
  titleEdit: {fontSize: 40},
  labelImage: {marginBottom: 10},
  image: {width: 100, height: 100},
  buttonImage: {
    backgroundColor: 'white',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    textAlign: 'center',
    borderColor: 'gray',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonUser: {backgroundColor: 'navy', borderRadius: 5, marginLeft: 50},
  pickerWidth: {width: 120},
  editButton: {
    backgroundColor: 'deeppink',
    padding: 10,
    elevation: 2,
    marginTop: 10,
    // marginLeft: '70%',
    // backgroundColor: '#2196F3',
  },
  editTextButton: {
    elevation: 2,
    paddingLeft: 20,
    paddingRight: 20,
    color: 'white',
  },
  cancelButton: {
    padding: 10,
    elevation: 2,
    width: '100%',
    marginLeft: '70%',
    backgroundColor: '#2196F3',
    position: 'absolute',
    bottom: 35,
    right: 35,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  touchableStyle: {
    backgroundColor: 'darkgreen',
    padding: 10,
    width: '100%',
    borderRadius: 5,

    elevation: 2,
    marginTop: 20,
    // marginLeft: '70%',
    // backgroundColor: '#2196F3',
  },
  textTitle: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalChooseView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: 'grey',

    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textChange: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  textCancel: {
    color: 'darkgreen',
  },
  chooserButton: {
    width: '100%',

    padding: 8,

    marginVertical: 5,
    borderBottomWidth: 1,
  },
});

export default UploadImage;
