import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModalTicketBaru from './Components/ModalTicketBaru';
import ModalTicket from './Components/ModalTicket';
import {Formik} from 'formik';

import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllPraktek,
  postAntrian,
  postAntrianPetugas,
} from '../../../../../utils/http';
import {
  authRefreshToken,
  dialogCallback,
  showToast,
  errorFetchWithFeedback,
  logout,
} from '../../../../../utils/functionHelper';
import {
  logoutUserActionCreator,
  refreshTokenActionCreator,
} from '../../../../../redux/actions/userAction';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
} from 'react-native-alert-notification';
import {successfullyMessage} from '../../../../../utils/CONSTANT';
import ModalScanOption from './Components/ModalScanOption';
import {getAllPraktekActionCreator} from '../../../../../redux/actions/praktekAction';

const initialStateForm = {
  id_praktek: '',
  prioritas: '',
};
const TiketAntrian = ({navigation}) => {
  const dispatch = useDispatch();

  const dataUser = useSelector(({reducerUser}) => reducerUser.data);
  const dataPraktek = useSelector(({reducerPraktek}) => reducerPraktek);
  const {
    errorPraktek,
    isLoading: isLoadingFetchPraktek,
    isRejected: isRejectedFetchPraktek,
    isFulfilled: isFulfilledFetchPraktek,
  } = dataPraktek;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTicketVisible, setModalTicketVisible] = useState(false);

  const [formScan, setFormScan] = useState({});
  const [modalScanVisible, setModalScanVisible] = useState(false);

  const [isNew, setIsNew] = useState(false);
  const [isLoadingPraktek, setIsLoadingPraktek] = useState(false);
  // const [dataPraktek, setDataPraktek] = useState([]);
  const [dataTicket, setDataTicket] = useState(null);

  const pendaftaranValidationSchema = yup.object().shape({
    id_praktek: yup.string().required('Poli Tujuan harus dipilih'),
    prioritas: yup.string().required('Prioritas harus dipilih'),
  });
  const scanOptionValidationSchema = yup.object().shape({
    type: yup.string().required('Pilih tujuan Scan'),
  });

  const printTicketHandler = () => {
    //print
  };

  const onScanClickHandler = (formBody, {resetForm}) => {
    setModalScanVisible(!modalScanVisible);
    navigation.navigate('Scanner', {
      type: formBody.type,
    });
  };
  const pendaftaranHandler = (formBody, {resetForm}) => {
    const newFormBody = {
      ...formBody,
      sumber: 'Mobile',
    };
    postAntrianPetugas(newFormBody, dataUser.token)
      .then(response => {
        if (response.status == 201) {
          console.log(response.data.data);
          showToast(
            ALERT_TYPE.SUCCESS,
            successfullyMessage.post,
            'Pendaftaran Antrian berhasil',
          );
          setTimeout(() => {
            setModalVisible(false);
            setDataTicket(response.data.data);
          }, 1500);
        }
      })
      .catch(error => {
        console.log(error);
        errorFetchWithFeedback(
          error,
          navigation.navigate,
          3000,
          () =>
            logout(
              dataUser.refreshToken,
              setIsLoadingPraktek,
              dispatch,
              logoutUserActionCreator,
              navigation,
            ),
          () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
        );
      });
  };

  const fetchDataPraktek = () => {
    dispatch(getAllPraktekActionCreator(dataUser.token));
  };
  // const fetchDataPraktek = () => {
  //   getAllPraktek(dataUser.token)
  //     .then(response => {
  //       console.log(response.data.data);
  //       setDataPraktek(response.data.data);
  //     })
  //     .catch(error => {
  //       errorFetchWithFeedback(
  //         error,
  //         navigation.navigate,
  //         3000,
  //         () =>
  //           logout(
  //             dataUser.refreshToken,
  //             setIsLoadingPraktek,
  //             dispatch,
  //             logoutUserActionCreator,
  //             navigation,
  //           ),
  //         () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
  //       );
  //     });
  // };
  useEffect(() => {
    fetchDataPraktek();
  }, []);

  useEffect(() => {
    if (isRejectedFetchPraktek) {
      errorFetchWithFeedback(
        errorPraktek,
        navigation.navigate,
        3000,
        () =>
          logout(
            dataUser.refreshToken,
            setIsLoadingPraktek,
            dispatch,
            logoutUserActionCreator,
            navigation,
          ),
        () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
      );
    }
  }, [isRejectedFetchPraktek]);

  useEffect(() => {
    if (dataTicket !== null) {
      console.log(dataTicket);
      setModalTicketVisible(!modalTicketVisible);
    }
  }, [dataTicket]);

  return (
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
          <FontAwesome name="ticket" size={150} color="black" />
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setIsNew(true);
            }}
            style={[
              styles.btnBuat,
              {backgroundColor: '#285430', marginTop: 80},
            ]}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Buat Pendaftaran Antrian Baru
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setModalScanVisible(true);
            }}
            style={[
              styles.btnBuat,
              {
                backgroundColor: 'white',
                borderColor: 'darkgreen',
                justifyContent: 'center',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AntDesign
                style={{marginHorizontal: 5}}
                name="qrcode"
                size={30}
                color="darkgreen"
              />
              <Text style={{color: 'darkgreen', textAlign: 'center'}}>
                Scan Antrian
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.floatingBtn}>
            <AntDesign name="qrcode" size={30} color="white" />
          </TouchableOpacity> */}
        </View>
        <ModalTicketBaru
          modalVisible={modalVisible}
          poliValue={dataPraktek.data}
          initialState={initialStateForm}
          setModalVisible={setModalVisible}
          submitBtnHandler={pendaftaranHandler}
          validationSchema={pendaftaranValidationSchema}
          isNew={isNew}
        />
        <ModalScanOption
          modalVisible={modalScanVisible}
          initialState={{type: ''}}
          setModalVisible={setModalScanVisible}
          submitBtnHandler={onScanClickHandler}
          validationSchema={scanOptionValidationSchema}
        />
        <ModalTicket
          modalVisible={modalTicketVisible}
          data={dataTicket}
          setModalVisible={setModalTicketVisible}
        />
      </View>
    </AlertNotificationRoot>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  btnBuat: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    borderWidth: 2,
    borderColor: 'darkgreen',
  },
  floatingBtn: {
    width: 60,
    height: 60,
    bottom: 10,
    right: 10,
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#5F8D4E',
    backgroundColor: '#5F8D4E',

    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default TiketAntrian;
