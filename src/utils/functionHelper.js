import {errorType} from './CONSTANT';

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {Alert} from 'react-native';

const showToast = (type, title, textBody) => {
  Toast.show({
    type: type,
    title: title,
    textBody: textBody,
  });
};

const alertConfirmation = (title, fnAction) => {
  return Alert.alert('Konfirmasi', title, [
    {
      text: 'Batal',
      onPress: () => {},
      onDismiss: () => {},

      style: 'cancel',
    },
    {
      text: 'Ya',
      onPress: () => fnAction(),
    },
  ]);
};
const dialogCallback = (title, body, isShow, type, callback = null) => {
  if (isShow) {
    console.log('show nih');
    Dialog.show({
      type: type,
      title: title,
      textBody: body,
      autoClose: true,
      onHide: async () => {
        if (callback !== null) {
          await callback();
        }
        Dialog.hide();
      },
      button: 'OK',
      // onPressButton: async () => {
      //   if (callback !== null) {
      //     await callback();
      //     Dialog.hide();
      //   } else {
      //     Dialog.hide();
      //   }
      // },
    });
  } else {
    Dialog.hide();
  }
  // Dialog.hide();
};
// const swalConfirmation = (text, action = null) => {
//   MySwal.fire({
//     // title: <p>{text}</p>,
//     icon: 'warning',
//     text,
//     confirmButtonColor: '#d33',

//     confirmButtosnText: 'Ya',
//     showCloseButton: true,
//     showCancelButton: true,
//     cancelButtonText: 'Tidak',
//   }).then(async result => {
//     if (result.isConfirmed) {
//       if (action !== null) {
//         await action();
//       }
//     }
//   });
// };

const errorFetch = async (
  error,
  navigate,
  setAlertValue,
  logout = null,
  time = 2000,
  refreshTokenFunction = null,
) => {
  console.log(error);
  if (error.response) {
    if (error.response.data.message === errorType.NO_ACCESS) {
      navigate('/unauthorize');
    } else if (
      error.response.data.message === errorType.TOKEN_ERROR ||
      error.response.data?.data?.message === errorType.TOKEN_ERROR
    ) {
      console.log('masuk sini');
      setAlertValue({
        isOpen: true,
        color: ALERT_TYPE.DANGER,
        text: 'Token Error',
      });
      const timeout = setTimeout(async () => {
        setAlertValue({
          isOpen: false,
          color: ALERT_TYPE.DANGER,
          text: 'Token Error',
        });
        await logout();
      }, time);

      // navigate('/login');
    } else if (error.response.data.message === errorType.TOKEN_EXPIRED) {
      setAlertValue({
        isOpen: true,
        color: ALERT_TYPE.DANGER,
        text: 'Token Expired',
      });
      const timeout = setTimeout(async () => {
        setAlertValue({
          isOpen: false,
          color: ALERT_TYPE.DANGER,
          text: 'Token Expired',
        });
        await refreshTokenFunction();
      }, time);
    } else if (error.response.data.status === 500) {
      setAlertValue({
        isOpen: true,
        color: ALERT_TYPE.DANGER,
        text: 'Internal Server Error',
      });
      const timeout = setTimeout(async () => {
        setAlertValue({
          isOpen: false,
          color: ALERT_TYPE.DANGER,
          text: error.response.data.message,
        });
      }, time);
    } else {
      setAlertValue({
        isOpen: true,
        color: ALERT_TYPE.DANGER,
        text: error.response.data.message,
      });
      const timeout = setTimeout(async () => {
        setAlertValue({
          isOpen: false,
          color: ALERT_TYPE.DANGER,
          text: error.response.data.message,
        });
      }, time);
    }
  } else if (error.code === 'ERR_NETWORK') {
    setAlertValue({
      isOpen: true,
      color: ALERT_TYPE.DANGER,
      text: 'Network Error',
    });
    const timeout = setTimeout(async () => {
      setAlertValue({
        isOpen: false,
        color: ALERT_TYPE.DANGER,
        text: 'Network Error',
      });
    }, time);
  } else {
    setAlertValue({
      isOpen: true,
      color: ALERT_TYPE.DANGER,
      text: error.message,
    });
    const timeout = setTimeout(async () => {
      setAlertValue({
        isOpen: false,
        color: ALERT_TYPE.DANGER,
        text: error.message,
      });
    }, time);
  }
};
const dialogFeedback = async (
  title,
  body,
  isShow = true,
  type,
  time,
  secondAction = null,
  callback = null,
) => {
  let isOpened = false;
  await dialogCallback(
    title,
    body,
    true,
    type,
    callback == null ? secondAction : callback,
  );

  // setTimeout(async () => {
  //   await dialogCallback(null, null, false, null, null);
  //   console.log('hallo');
  //   if (secondAction !== null) {
  //     await secondAction();
  //     await dialogCallback(null, null, false, null, null);
  //   }
  // }, time);

  // ;
};
const errorFetchWithFeedback = async (
  error,
  navigate,
  time = 2000,
  logout = null,
  refreshTokenFunction = null,
) => {
  if (error.response) {
    if (error.response.data.message === errorType.NO_ACCESS) {
      navigate('/unauthorize');
    } else if (error.response.data.message === errorType.TOKEN_ERROR) {
      dialogFeedback(
        'Oops..',
        'Token Error',
        true,
        ALERT_TYPE.DANGER,
        time,
        logout,
      );

      // navigate('/login');
    } else if (
      error.response.data.message === errorType.TOKEN_EXPIRED ||
      error.response.data?.data?.message === errorType.TOKEN_EXPIRED
    ) {
      console.log(error);
      dialogFeedback(
        'Oops..',
        'Token Expired',
        true,
        ALERT_TYPE.DANGER,
        time,
        refreshTokenFunction,
      );
    } else if (error.response.data.status === 500) {
      console.log('error 500');
      dialogFeedback(
        'Oops..',
        'Terjadi Kesalahan, Pastikan Terhubung ke Internet',
        true,
        ALERT_TYPE.DANGER,
        time,
        null,
      );
    } else {
      dialogFeedback(
        'Oops..',
        error.response.data.message,
        true,
        ALERT_TYPE.DANGER,
        time,
        null,
      );
    }
  } else if (error.code === 'ERR_NETWORK') {
    dialogFeedback(
      'Oops..',
      'Network Error',
      true,
      ALERT_TYPE.DANGER,
      time,
      null,
    );
  } else if (error.toJSON().message === 'Network Error') {
    dialogFeedback(
      'Oops..',
      'No Internet Connection',
      true,
      ALERT_TYPE.DANGER,
      time,
      null,
    );
  } else {
    console.log('error else');
    dialogFeedback(
      'Oops..',
      error.message,
      true,
      ALERT_TYPE.DANGER,
      time,
      null,
    );
  }
};

const dateConvert = date => {
  const newDate = new Date(date);
  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()} ${
    newDate.getHours().toString().length < 2
      ? `0${newDate.getHours()}`
      : newDate.getHours()
  }:${
    newDate.getMinutes().toString().length < 2
      ? `0${newDate.getMinutes()}`
      : newDate.getMinutes()
  }:${
    newDate.getSeconds().toString().length < 2
      ? `0${newDate.getSeconds()}`
      : newDate.getSeconds()
  }`;
};
const dateOnlyConvert = date => {
  const newDate = new Date(date);

  return `${
    newDate.getDate().toString().length < 2
      ? `0${newDate.getDate()}`
      : newDate.getDate()
  }/${
    (newDate.getMonth() + 1).toString().length < 2
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};
const dateToDBConvert = (date = null) => {
  let newDate;
  if (date == null) {
    newDate = new Date();
  } else {
    newDate = new Date(date);
  }
  return `${newDate.getFullYear()}-${
    (newDate.getMonth() + 1).toString().length < 2
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1
  }-${
    newDate.getDate().toString().length < 2
      ? `0${newDate.getDate()}`
      : newDate.getDate()
  }`;
};
const logout = async (
  refreshToken,
  setIsLoading = null,
  dispatch,
  logoutUserActionCreator,
  navigation,
) => {
  if (setIsLoading) {
    setIsLoading(true);
  }
  await dispatch(logoutUserActionCreator(refreshToken));
  Dialog.hide();
  navigation.navigate('Intro');
  if (setIsLoading) {
    setIsLoading(false);
  }
};
const authRefreshToken = async (
  dispatch,
  refreshTokenActionCreator,
  dataUser,
) => {
  await dispatch(refreshTokenActionCreator(dataUser.refreshToken));
};
export {
  dialogCallback,
  errorFetchWithFeedback,
  dialogFeedback,
  logout,
  authRefreshToken,
  showToast,
  dateConvert,
  errorFetch,
  alertConfirmation,
  dateOnlyConvert,
  dateToDBConvert,
};
