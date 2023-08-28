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
  Text,
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
  showToast,
} from '../../../../../utils/functionHelper';

import {
  getAllPasienNoKK,
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
import SelectMember from '../../../Components/SelectMember';
import useImageUpload from '../../../CustomHooks/useImageUpload';
import LoaderModal from '../../../../../Components/LoaderModal';
import {alertConfirmation} from '../../../../../utils/functionHelper';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
} from 'react-native-alert-notification';
const KEYBOARD_VERTICAL_OFFSET = useHeaderHeight + StatusBar.currentHeight;

const initialState = {};
const PendaftaranLama = ({params, onChangeIndex}) => {
  const dataUser = useSelector(({reducerUser}) => reducerUser.data);
  const dataPraktek = useSelector(({reducerPraktek}) => reducerPraktek.data);
  const dataKartuKeluarga = useSelector(
    ({reducerKartuKeluarga}) => reducerKartuKeluarga.data,
  );
  const [dataPasienBykk, setDataPasienByKk] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [progress, setProgress] = useState(0);

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
    // nik: yup
    //   .string()
    //   .test(
    //     'len',
    //     'NIK terdiri dari 16 digit',
    //     val => val?.toString().length == 16,
    //   )
    //   .required('NIK harus diisi'),
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

  const fetchDataPasienByKk = useCallback(() => {
    //mendapatkan data pasien yang memiliki no. kk yang sama dengan user
    getAllPasienNoKK(dataUser.no_kk, dataUser.token)
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          setDataPasienByKk(response.data.data);
        }
      })
      .catch(error => {
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
  }, [dataUser, dispatch, navigation]);
  useEffect(() => {
    fetchDataPraktek();
    fetchDataKartuKeluargaByID();
  }, [fetchDataKartuKeluargaByID, fetchDataPraktek]);

  useEffect(() => {
    fetchDataPasienByKk();
  }, [fetchDataPasienByKk]);
  const onCLickSelectMemberHandler = value => {
    if (value !== '') {
      checkNik(value);
      setIsAvailable(false);
    } else {
      setIsAvailable(false);

      setFormField({...formField, nik: ''});
    }
  };

  const checkNik = async nikField => {
    if (nikField) {
      if (nikField?.length < 16 || nikField == '') {
        return showToast(
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
                    setFormField({
                      ...formField,
                      nama: response.data.data.nama,
                      no_telepon: response.data.data.no_telepon,
                      bpjs: response.data.data.bpjs,
                      pekerjaan: response.data.data.pekerjaan,
                      jenis_kelamin: response.data.data.jenis_kelamin,
                      alamat: response.data.data.alamat,
                      rt: response.data.data.rt,
                      rw: response.data.data.rw,
                      kecamatan: response.data.data.kecamatan,
                      kelurahan: response.data.data.kelurahan,
                      pendidikan_terakhir:
                        response.data.data.pendidikan_terakhir,
                      status_anggota_keluarga:
                        response.data.data.status_anggota_keluarga,
                      nomor_kartu_bpjs: response.data.data.nomor_kartu_bpjs,
                      keluhan: response.data.data.keluhan,
                      nik: nikField,
                      tempat_lahir: response.data.data.ttl.split(',')[0],
                      tanggal_lahir: response.data.data.ttl.split(',')[1],
                    });
                    if (
                      response.data.data.url_foto_kartu_identitas !== '' ||
                      response.data.data.url_foto_kartu_identitas !== null
                    ) {
                      setImageFile({
                        ...imageFile,
                        fileName: response.data.data.url_foto_kartu_identitas,
                      });
                    }
                  },
                );

                // fillForm(response.data.data);
              }
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
                  setIsLoading,
                  dispatch,
                  logoutUserActionCreator,
                  navigation,
                ),
              () =>
                authRefreshToken(dispatch, refreshTokenActionCreator, dataUser),
            );
          })
          .finally(() => {});
      }
    } else {
      return showToast(ALERT_TYPE.DANGER, 'Oops...', 'NIK Tidak boleh kosong');
    }
  };

  const cameraHandler = async () => {
    const options = {
      noData: true,
      skipBackup: true,
      path: 'images',
    };
    launchCamera(options, response => {
      setShowModalPicker(false);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        // eslint-disable-next-line no-alert
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
  useEffect(() => {
    console.log(formField);
  }, [formField]);
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
    console.log(imageFile);
    // if (!isSubmitted) {
    //   return showToast(
    //     ALERT_TYPE.DANGER,
    //     'Oops...',
    //     'Silahkan klik tombol cek NIK terlebih dahulu',
    //   );
    // }
    if (imageFile == null || imageFile == undefined) {
      return showToast(
        ALERT_TYPE.DANGER,
        'Oops..',
        'Mohon Upload Kartu Identitas',
      );
    }
    const newFormData = {
      ...formData,
      nik: formField.nik,
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
      });
  };

  const onSubmitTicketHandler = () => {
    alertConfirmation('Yakin untuk melanjutkan ?', () =>
      postAntrian(formikForm.formData, dataUser.token)
        .then(response => {
          if (response.status == 201) {
            setIsLoadingSubmitted(true);
            if (imageFile.uri) {
              uploadImageHandler(formikForm.formData.nik, storageRef => {
                saveToDB(
                  storageRef,

                  formikForm.formData,
                );
                formikForm.resetHandler();
                setFormikForm({});
                setShowModalTicket(false);
              });
            } else {
              dialogFeedback(
                'Sukses',
                'Pendaftaran Berhasil',
                true,
                ALERT_TYPE.SUCCESS,
                3000,

                null,
              );
            }
            setFilterState({});
            setFormikForm({});
            setIsAvailable(false);
            setShowModalTicket(false);
            setDataTicketView(null);
            onCLickSelectMemberHandler('');
            setIsLoadingSubmitted(false);
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
    if (formField.nik == '') {
      return showToast(
        ALERT_TYPE.DANGER,
        'Oopss..',
        'Pilih Anggota Keluarga Terlebih dahulu',
      );
    }
    getInformasiKuotaAntrian(
      queryString.stringify({
        id_praktek: filterState.id_praktek,
        tanggal_periksa: dateOnlyConvert(filterState.tanggal_periksa),
      }),
      dataUser.token,
    )
      .then(response => {
        if (response.status == 200) {
          showToast(ALERT_TYPE.SUCCESS, 'Yeay', response.data.message);
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
                <Text>Pilih Anggota Keluarga</Text>
                <SelectMember
                  extended={false}
                  data={dataPasienBykk}
                  selectedMember={formField.nik}
                  setSelectedMember={onCLickSelectMemberHandler}
                />
                <ScrollView style={{marginTop: 20}}>
                  <FormPendaftaran
                    formValidationSchema={formValidationSchema}
                    initialForm={formField}
                    isOpenTglKunjungan={isOpenTglKunjungan}
                    isOpenTglLahir={isOpenTglLahir}
                    tglLahir={tglLahir}
                    dataPraktek={dataPraktek}
                    tglKunjungan={tglKunjungan}
                    setIsOpenTglKunjungan={setIsOpenTglKunjungan}
                    setIsOpenTglLahir={setIsOpenTglLahir}
                    setTglKunjungan={setTglKunjungan}
                    setTglLahir={setTglLahir}
                    isNew={false}
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
export default PendaftaranLama;
