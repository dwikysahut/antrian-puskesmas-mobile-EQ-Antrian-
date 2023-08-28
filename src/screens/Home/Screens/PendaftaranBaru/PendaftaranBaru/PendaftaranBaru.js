import {useHeaderHeight} from '@react-navigation/stack';
import {ScrollView} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import FormPendaftaran from '../Components/FormPendaftaran';
import LoaderIndicator from '../../../../../Components/LoaderIndicator';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ModalTicket from '../Components/ModalTicket';
import {
  authRefreshToken,
  dateOnlyConvert,
  dialogCallback,
  dialogFeedback,
  errorFetchWithFeedback,
  logout,
  showToast2,
} from '../../../../../utils/functionHelper';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
} from 'react-native-alert-notification';
import {
  getInformasiAntrianSementara,
  getInformasiKuotaAntrian,
  getPasienAntrianByIdAndKk,
  postAntrian,
  putKartuIdentitasPasien,
  putPasien,
} from '../../../../../utils/http';
import {useDispatch, useSelector} from 'react-redux';
import {
  logoutUserActionCreator,
  refreshTokenActionCreator,
} from '../../../../../redux/actions/userAction';
import * as yup from 'yup';
import queryString from 'query-string';
import {getAllPraktekActionCreator} from '../../../../../redux/actions/praktekAction';
import {getKartuKeluargaByIdActionCreator} from '../../../../../redux/actions/kartuKeluarga';
import UploadImage from '../Components/UploadImage';
import useImageUpload from '../../../CustomHooks/useImageUpload';
import LoaderModal from '../../../../../Components/LoaderModal';
import {alertConfirmation} from '../../../../../utils/functionHelper';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {BaseToast, ErrorToast} from 'react-native-toast-message';
import useCameraPermission from '../../../../../utils/useCameraPermission';
const KEYBOARD_VERTICAL_OFFSET = useHeaderHeight + StatusBar.currentHeight;

const initialState = {};
const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#6dad6d',
        backgroundColor: '#303030',
        height: 80,
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
const PendaftaranBaru = ({params, onChangeIndex}) => {
  const dataUser = useSelector(({reducerUser}) => reducerUser.data);
  const dataPraktek = useSelector(({reducerPraktek}) => reducerPraktek.data);
  const dataKartuKeluarga = useSelector(
    ({reducerKartuKeluarga}) => reducerKartuKeluarga.data,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  // const [progress, setProgress] = useState(0);
  const {requestCameraPermission} = useCameraPermission();
  const dispatch = useDispatch();
  const [tglLahir, setTglLahir] = useState(new Date());
  const [tglKunjungan, setTglKunjungan] = useState(new Date());
  const [isOpenTglKunjungan, setIsOpenTglKunjungan] = useState(false);
  const [isOpenTglLahir, setIsOpenTglLahir] = useState(false);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalPicker, setShowModalPicker] = useState(false);
  const [isShowModalTicket, setShowModalTicket] = useState(false);
  const [isLoadingSubmitted, setIsLoadingSubmitted] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [filterState, setFilterState] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [dataTicketView, setDataTicketView] = useState(null);
  const {uploadImageHandler, progress, imageFile, setImageFile} =
    useImageUpload({setShowModalUpload});

  const navigation = useNavigation();

  const [formField, setFormField] = useState({
    ...initialState,
    nik: '',
    nama: '',
    no_telepon: '',
    bpjs: '',

    pekerjaan: '',

    jenis_kelamin: '',

    alamat: '',
    rt: '',
    rw: '',
    kecamatan: '',
    kelurahan: '',

    tempat_lahir: '',
    tanggal_lahir: '',
    pendidikan_terakhir: '',
    status_anggota_keluarga: '',
    id_praktek: params?.id_praktek || '',

    tanggal_periksa: '',

    nomor_kartu_bpjs: '',
    keluhan: '',
    no_kk: dataUser?.no_kk,
    user_id: dataUser?.user_id,
    kepala_keluarga: dataKartuKeluarga?.kepala_keluarga,
  });

  const [formikForm, setFormikForm] = useState({});

  const formValidationSchema = yup.object().shape({
    nik: yup
      .string()
      .test(
        'len',
        'NIK terdiri dari 16 digit',
        val => val?.toString().length == 16,
      )
      .required('NIK harus diisi'),
    nama: yup.string().required('Nama harus diisi'),
    no_telepon: yup
      .string()
      .test(
        'len',
        'No.Telepon terdiri 10 - 13 digit',
        val => val?.toString().length <= 13 && val?.toString().length >= 10,
      )
      .required('No. Telepon harus diisi'),
    bpjs: yup.string().required('Status BPJS harus diisi'),
    pekerjaan: yup.string().required('Pekerjaan harus diisi'),
    no_kk: yup
      .string()
      //   .test('len', 'No. KK terdiri dari 16 digit', (val) => val?.toString().length == 16)
      .required('No. KK  harus diisi'),
    jenis_kelamin: yup
      .string()
      .nullable(true)
      .required('Jenis Kelamin harus diisi'),
    alamat: yup.string().required('Alamat harus diisi'),
    rt: yup.string().required('RT harus diisi'),
    rw: yup.string().required('RW harus diisi'),
    kecamatan: yup.string().required('Kecamatan harus diisi'),
    kelurahan: yup.string().required('Kelurahan harus diisi'),
    kepala_keluarga: yup
      .string()
      .nullable(true)
      .required('kepala_keluarga harus diisi'),
    tempat_lahir: yup.string().required('Tempat Lahir harus diisi'),
    tanggal_lahir: yup.string().required('Tanggal Lahir harus diisi'),
    pendidikan_terakhir: yup
      .string()
      .required('Pendidikan Terakhir harus diisi'),
    status_anggota_keluarga: yup
      .string()
      .required('Status Anggota Keluraga harus diisi'),
    id_praktek: yup.string().required('Poli Tujuan harus diisi'),
    tanggal_periksa: yup.string().required('Tanggal Kunjungan harus diisi'),
    // daftar_dengan_bpjs: yup
    //   .string()
    //   .nullable(true)
    //   .required('Field Belum Dipilih'),
    nomor_kartu_bpjs: yup.string().when('bpjs', {
      is: value => value && value === '1',
      then: yup
        .string()
        .test(
          'len',
          'No. Kartu BPJS terdiri dari 16 digit',
          val => val?.toString().length == 16,
        )
        .required('Nomor kartu BPJS harus diisi'),
    }),
    keluhan: yup.string().required('Keluhan harus diisi'),
  });
  const fetchDataPraktek = useCallback(() => {
    dispatch(getAllPraktekActionCreator(dataUser.token));
  }, [dataUser, dispatch]);
  const fetchDataKartuKeluargaByID = useCallback(() => {
    dispatch(getKartuKeluargaByIdActionCreator(dataUser.no_kk, dataUser.token));
  }, [dataUser, dispatch]);

  useEffect(() => {
    fetchDataPraktek();
    fetchDataKartuKeluargaByID();
  }, [fetchDataKartuKeluargaByID, fetchDataPraktek]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      console.log('ini focus');
      await fetchDataKartuKeluargaByID();
    });
    return unsubscribe;
  }, []);

  const checkNik = async (nikField, handleReset) => {
    if (nikField) {
      if (nikField?.length < 16 || nikField == '') {
        return showToast2(
          ALERT_TYPE.DANGER,
          'Oops...',
          'NIK terdiri dari 16 digit',
        );
      } else {
        getPasienAntrianByIdAndKk(
          nikField,
          queryString.stringify({no_kk: formField.no_kk}),
          dataUser.token,
        )
          .then(response => {
            if (response.status == 200) {
              console.log(response.data.data);
              if (response.data.data.kuota_daftar < 1) {
                dialogCallback(
                  'Oops...',
                  'Kuota Daftar Pasien Tidak Tersedia',
                  true,
                  ALERT_TYPE.DANGER,
                );
              } else {
                dialogCallback(
                  '',
                  'Data Pasien telah tersedia dan dapat melakukan pendaftaran',
                  true,
                  ALERT_TYPE.SUCCESS,
                  () => {
                    handleReset();
                    //pindah ke tab view sebelah/pasien lama
                    onChangeIndex(response.data.data);
                  },
                );

                // fillForm(response.data.data);
              }
            }
          })
          .catch(error => {
            console.log(error);
            if (error.response.data.status == 404) {
              dialogCallback(
                '',
                'Data dengan NIK tersebut belum pernah terdaftar sebagai pasien',
                true,
                ALERT_TYPE.SUCCESS,
              );
              setIsSubmitted(true);
            } else {
              console.log(error);
              errorFetchWithFeedback(
                error,
                navigation.navigate,
                3000,
                () =>
                  logout(
                    dataUser.refreshToken,
                    setIsLoading,
                    dispatch,
                    logoutUserActionCreator,
                    navigation,
                  ),
                () =>
                  authRefreshToken(
                    dispatch,
                    refreshTokenActionCreator,
                    dataUser,
                  ),
              );
            }
          })
          .finally(() => {});
      }
    } else {
      console.log('pendaftaran baru');
      return showToast2(ALERT_TYPE.DANGER, 'Oops...', 'NIK Tidak boleh kosong');
    }
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
                  () => setShowModalUpload(false),
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
    // launchCamera(options, response => {
    //   setShowModalPicker(false);
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //     // eslint-disable-next-line no-alert
    //     // alert(response.customButton);
    //   } else {
    //     if (response.assets[0].fileSize / 1024 / 1024 > 3) {
    //       dialogFeedback(
    //         'Oops..',
    //         'Ukuran File tidak boleh lebih dari 3 MB',
    //         true,
    //         ALERT_TYPE.DANGER,
    //         3000,
    //         () => setShowModal(false),
    //         null,
    //       );
    //       return;
    //     }
    //     const source = {uri: response.uri};
    //     console.log('response', JSON.stringify(response));
    //     setImageFile({
    //       fileName: response.assets[0].fileName,
    //       size: response.assets[0].fileSize,
    //       uri: response.assets[0].uri,
    //     });
    //   }
    // });
  };
  const onCloseShowModal = () => {
    setImageFile({});
    setShowModalUpload(!showModalUpload);
  };
  const onSubmitImageSelect = () => {
    setShowModalUpload(!showModalUpload);
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

  const saveToDB = async (storageRef, formData) => {
    storageRef.getDownloadURL().then(async downloadUrl => {
      try {
        const response = await putKartuIdentitasPasien(
          formData.nik,
          {
            url_foto_kartu_identitas: downloadUrl,
          },
          dataUser.token,
        );
        console.log(response);
        if (response.data.status == 200) {
          setShowModalPicker(false);

          dialogFeedback(
            'Sukses',
            'Pendaftaran Berhasil',
            true,
            ALERT_TYPE.SUCCESS,
            3000,

            null,
          );
        }
        setImageFile(null);
      } catch (error) {
        errorFetchWithFeedback(
          error,
          navigation.navigate,
          3000,
          () =>
            logout(
              dataUser.refreshToken,
              setIsLoading,
              dispatch,
              logoutUserActionCreator,
              navigation,
            ),
          () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
        );
      } finally {
        setIsLoadingSubmitted(false);
      }
    });
  };
  const submitBtnHandler = (formData, {resetForm}) => {
    formData.image = {...imageFile};
    setIsLoadingSubmit(true);
    console.log(imageFile);
    if (!isSubmitted) {
      setIsLoadingSubmit(false);
      return showToast2(
        ALERT_TYPE.DANGER,
        'Oops...',
        'Silahkan klik tombol cek NIK terlebih dahulu',
      );
    }
    if (imageFile == null || imageFile == undefined) {
      setIsLoadingSubmit(false);

      return showToast2(
        ALERT_TYPE.DANGER,
        'Oops..',
        'Mohon Upload Kartu Identitas',
      );
    }
    const newFormData = {
      ...formData,
      ttl: `${formData.tempat_lahir},${dateOnlyConvert(formData.tanggal_lahir)
        .split('/')
        .reverse()
        .join('-')}`,
      tanggal_periksa: dateOnlyConvert(formData.tanggal_periksa),

      sumber: 'Mobile',
    };

    getInformasiAntrianSementara(
      queryString.stringify({
        id_praktek: newFormData.id_praktek,
        tanggal_periksa: newFormData.tanggal_periksa
          .split('/')
          .reverse()
          .join('-'),
      }),
      dataUser.token,
    )
      .then(response => {
        if (response.status == 200) {
          //set state data form dari formik
          setFormikForm({
            formData: newFormData,
            resetHandler: () => resetForm(),
          });
          setDataTicketView(response.data.data);
        }
      })
      .catch(error => {
        // if (error.response.data.status == 403) {
        // }
        errorFetchWithFeedback(
          error,
          navigation.navigate,
          3000,
          () =>
            logout(
              dataUser.refreshToken,
              setIsLoading,
              dispatch,
              logoutUserActionCreator,
              navigation,
            ),
          () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
        );
      })
      .finally(() => {
        setIsLoadingSubmit(false);
      });
  };

  const onSubmitTicketHandler = () => {
    alertConfirmation('Yakin untuk melanjutkan ?', () =>
      postAntrian(formikForm.formData, dataUser.token)
        .then(response => {
          if (response.status == 201) {
            setIsLoadingSubmitted(true);
            uploadImageHandler(formikForm.formData.nik, storageRef => {
              saveToDB(
                storageRef,

                formikForm.formData,
              );
              formikForm.resetHandler();
              setFilterState({});
              setFormikForm({});
              setIsAvailable(false);
              setShowModalTicket(false);
              setDataTicketView(null);
              setIsLoadingSubmitted(false);
              setImageFile(null);
              formikForm.resetHandler();
            });

            formikForm.resetHandler();
          }
        })
        .catch(error => {
          console.log(error);
          setIsLoadingSubmitted(false);
          errorFetchWithFeedback(
            error,
            navigation.navigate,
            3000,
            () =>
              logout(
                dataUser.refreshToken,
                setIsLoading,
                dispatch,
                logoutUserActionCreator,
                navigation,
              ),
            () =>
              authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
          );
        })
        .finally(() => {
          // setIsLoadingSubmitted(false);
        }),
    );
  };

  const onChangeFilter = ({name, value}) => {
    setFilterState({...filterState, [name]: value});
    setIsAvailable(false);
  };
  const onSubmitFilter = () => {
    console.log(filterState);
    getInformasiKuotaAntrian(
      queryString.stringify({
        id_praktek: filterState.id_praktek,
        tanggal_periksa: dateOnlyConvert(filterState.tanggal_periksa),
      }),
      dataUser.token,
    )
      .then(response => {
        if (response.status == 200) {
          showToast2(ALERT_TYPE.SUCCESS, 'Yeay..', response.data.message);
          setIsAvailable(true);
        }
      })
      .catch(error => {
        console.log(error);
        setIsLoadingSubmitted(false);
        errorFetchWithFeedback(
          error,
          navigation.navigate,
          3000,
          () =>
            logout(
              dataUser.refreshToken,
              setIsLoading,
              dispatch,
              logoutUserActionCreator,
              navigation,
            ),
          () => authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
        );
      });
  };

  useEffect(() => {
    if (dataTicketView !== null) {
      setShowModalTicket(true);
    }
  }, [dataTicketView]);
  useEffect(() => {
    if (isOwner) {
      console.log(dataUser);
      setFormField({
        ...formField,
        nama: dataUser.nama_user,
        no_telepon: dataUser.no_telepon,
        jenis_kelamin: dataUser.jenis_kelamin,
        tanggal_lahir: dataUser.tanggal_lahir,
      });
    } else {
      setFormField({
        ...formField,
        nama: '',
        no_telepon: '',
        jenis_kelamin: '',
        tanggal_lahir: '',
      });
    }
  }, [isOwner]);
  return (
    <AlertNotificationRoot>
      {dataPraktek.isLoading ? (
        <LoaderIndicator />
      ) : (
        <KeyboardAvoidingView
          keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                <ScrollView style={{marginTop: 20}}>
                  <FormPendaftaran
                    formValidationSchema={formValidationSchema}
                    initialForm={formField}
                    isOpenTglKunjungan={isOpenTglKunjungan}
                    isOpenTglLahir={isOpenTglLahir}
                    tglLahir={tglLahir}
                    dataPraktek={dataPraktek}
                    tglKunjungan={tglKunjungan}
                    isLoading={isLoadingSubmit}
                    setIsOpenTglKunjungan={setIsOpenTglKunjungan}
                    setIsOpenTglLahir={setIsOpenTglLahir}
                    setTglKunjungan={setTglKunjungan}
                    setTglLahir={setTglLahir}
                    isNew={true}
                    isOwner={isOwner}
                    setIsOwner={setIsOwner}
                    filterState={filterState}
                    onChangeFilter={onChangeFilter}
                    onSubmitFilter={onSubmitFilter}
                    isAvailable={isAvailable}
                    imageFile={imageFile}
                    noKk={dataUser.no_kk}
                    checkNik={checkNik}
                    showModalUpload={showModalUpload}
                    setShowModalUpload={setShowModalUpload}
                    showModalPicker={showModalPicker}
                    setShowModalPicker={setShowModalPicker}
                    cameraHandler={cameraHandler}
                    galleryHandler={galleryHandler}
                    submitBtnHandler={submitBtnHandler}
                  />
                </ScrollView>
                <View style={{flex: 1}} />
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
          {/* //modal */}
          <LoaderModal
            modalVisible={isLoadingSubmitted}
            setModalVisible={setIsLoadingSubmitted}
          />
          <ModalTicket
            modalVisible={isShowModalTicket}
            data={dataTicketView}
            onClickSubmit={onSubmitTicketHandler}
            setModalVisible={setShowModalTicket}
          />
          <UploadImage
            showModal={showModalUpload}
            image={imageFile}
            progress={progress}
            onCloseShowModal={onCloseShowModal}
            setShowModal={setShowModalUpload}
            onSubmitHandler={onSubmitImageSelect}
            showModalPicker={showModalPicker}
            setShowModalPicker={setShowModalPicker}
            cameraHandler={cameraHandler}
            galleryHandler={galleryHandler}
          />
          <Toast config={toastConfig} />
        </KeyboardAvoidingView>
      )}
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inner: {
    paddingHorizontal: 16,
    paddingVertical: 8,

    flex: 1,
    justifyContent: 'flex-end',
  },
  containerImage: {
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  headline: {
    fontSize: 32,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,

    color: 'black',
    fontFamily: 'JosefinSans-Bold',
  },
  subHeadline: {
    fontSize: 25,
    marginTop: 5,
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,

    color: 'lightgrey',
    fontFamily: 'JosefinSans-Bold',
  },
});
export default PendaftaranBaru;
