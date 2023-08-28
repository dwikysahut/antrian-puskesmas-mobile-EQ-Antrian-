import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import * as yup from 'yup';
import {connect, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import {StyleSheet} from 'react-native';
import FormProfile from './Components/FormProfile';
import {Formik} from 'formik';
import {
  getUserProfileCreator,
  logoutUserActionCreator,
  putUserActionCreator,
  refreshTokenActionCreator,
} from '../../../../redux/actions/userAction';
import {
  authRefreshToken,
  dateConvert,
  dateOnlyConvert,
  dialogCallback,
  dialogFeedback,
  errorFetchWithFeedback,
  logout,
} from '../../../../utils/functionHelper';
import {successfullyMessage} from '../../../../utils/CONSTANT';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from 'react-native-alert-notification';
import LoaderIndicator from '../../../../Components/LoaderIndicator';

const EditProfile = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const deviceWidth = Dimensions.get('window').width;
  const [formState, setFormState] = useState({
    user_id: '',
    no_kk: '',
    nama_user: '',
    password: '',
    email: '',
    no_telepon: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
  });
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isOpenDate, setIsOpenDate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateValue, setDateValue] = useState('');
  const profileValidationSchema = yup.object().shape({
    user_id: yup
      .number()
      .test(
        'len',
        'User ID/NIK terdiri dari 16 angka',
        val => val?.toString().length === 16,
      )
      .required('User ID harus diisi')
      .typeError('No. Rekam Medis terdiri dari angka'),
    no_kk: yup
      .string()
      .test('len', 'No. KK terdiri dari 16 angka', val => val?.length === 16)
      .required('No. Kartu Keluarga harus diisi'),
    nama_user: yup.string().required('Nama User harus diisi'),
    no_telepon: yup
      .string()
      .test(
        'len',
        'No. Telepon terdiri dari 10 - 13 angka',
        val => val?.length >= 10 && val?.toString().length <= 13,
      )
      .required('No. Telepon harus diisi'),
    email: yup.string().required('Email harus diisi'),
    jenis_kelamin: yup.string().required('Jenis Kelamin harus dipilih'),
    tanggal_lahir: yup.string().required('Tanggal lahir harus dipilih'),
    // id_rak: yup.string().required('Kode Rak harus Diisi'),
  });

  const fetchDataUserProfile = async () => {
    setIsLoading(true);
    await props
      .getUserProfileAction(props.dataUser.user_id, props.dataUser.token)
      .catch(error => {
        console.log(error);
        errorFetchWithFeedback(
          error,
          navigation.navigate,
          2000,
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (props.isRejectedRefreshToken) {
      logout();
    }
  }, [props.isRejectedRefreshToken]);

  useEffect(() => {
    fetchDataUserProfile();
    console.log('useeffect1');
  }, []);

  useEffect(() => {
    if (props.isFulfilled) {
      console.log('useeffect2');
      setFormState({
        ...props.dataUser,
      });
      console.log(formState);
    }
  }, [props.dataUser, props.isFulfilled]);

  useEffect(() => {
    if (props.isFulfilled && isEdit) {
      console.log('mantap');
      dialogCallback(
        'Success',
        successfullyMessage.edit,
        true,
        ALERT_TYPE.SUCCESS,

        // setIsEdit(false),
      );
      // setIsEdit(false);
    }
  }, [isEdit, props.isFulfilled]);

  const onSubmitHandler = async formData => {
    // setIsLoading(true);
    setIsEdit(true);
    console.log('isEdit: ' + isEdit);

    const newFormData = {
      ...formData,
      tanggal_lahir: dateOnlyConvert(formData.tanggal_lahir),
    };
    delete newFormData.user_id;
    delete newFormData.token;
    delete newFormData.fcmToken;
    delete newFormData.refreshToken;

    await props
      .putUserAction(props.dataUser.user_id, newFormData, props.dataUser.token)
      .catch(error => {
        setIsEdit(false);
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
      })
      .finally(() => {
        // setIsLoading(false);
        // setIsEdit(false);
      });
  };
  return (
    <AlertNotificationRoot>
      {isLoading ? (
        <LoaderIndicator />
      ) : (
        <Formik
          validateOnChange={false}
          enableReinitialize
          initialValues={{...formState}}
          validationSchema={profileValidationSchema}
          onSubmit={onSubmitHandler}>
          {({
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            resetForm,
            values,
            errors,
            isValid,
          }) => (
            <FormProfile
              values={values}
              errors={errors}
              handleSubmit={handleSubmit}
              setFieldValue={setFieldValue}
              show={show}
              isValid={isValid}
              handleChange={handleChange}
              isOpenDate={isOpenDate}
              date={date}
              isLoading={props.isLoading}
              dateValue={dateValue}
              setShow={setShow}
              setIsOpenDate={setIsOpenDate}
              setDate={setDate}
              setDateValue={setDateValue}
            />
          )}
        </Formik>
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
    padding: 25,
    marginTop: 30,
    flex: 1,
    justifyContent: 'flex-end',
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
    lineHeight: 35 * 0.75,
    paddingTop: 35 - 35 * 0.75,

    marginBottom: 30,
    color: 'lightgrey',
    fontFamily: 'JosefinSans-Bold',
  },
});

const mapStateToProps = ({reducerUser}) => ({
  isRejected: reducerUser.isRejected,
  isRejectedRefreshToken: reducerUser.isRejectedRefreshToken,
  isFulfilled: reducerUser.isFulfilled,
  isLoading: reducerUser.isLoading,
  dataUser: reducerUser.data,
  message: reducerUser.message,
  error: reducerUser.error,
});
const mapDispatchToProps = dispatch => ({
  putUserAction: async (id, body, token) =>
    await dispatch(putUserActionCreator(id, body, token)),
  getUserProfileAction: async (id, token) =>
    await dispatch(getUserProfileCreator(id, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
