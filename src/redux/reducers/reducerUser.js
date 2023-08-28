/* eslint-disable default-param-last */
/* eslint-disable default-case */
import {URL_BASE} from '../../utils/CONSTANT';
import {getFcmToken} from '../../utils/functionHelper';
import {
  pending,
  rejected,
  fulfilled,
  loginUserAction,
  getUserByIdAction,
  storeFcmToken,
  logoutUserAction,
  refreshTokenAction,
  putUserAction,
  getUserProfileAction,
} from '../actions/actionTypes';
import {
  runSocketDisconnect,
  socketDisconnect,
  socketInit,
} from '../../context/socket';
const initialValue = {
  data: {},
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  error: null,
  message: '',
  isRejectedRefreshToken: false,
};
import {io} from 'socket.io-client';
const socket = socketInit();
const dataUser = (prevState = initialValue, action) => {
  switch (action.type) {
    case loginUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
        isRejectedRefreshToken: false,
      };
    case loginUserAction + rejected:
      console.log(action.payload);

      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        error: action.payload.response?.data,
        message: '',
        isRejectedRefreshToken: false,
      };
    case loginUserAction + fulfilled:
      console.log(action.payload);
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        isRejectedRefreshToken: false,
        data: action.payload.data.data,
        error: null,

        message: action.payload.data.message,
      };

    case logoutUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
        isRejectedRefreshToken: false,
      };
    case logoutUserAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        error: action.payload.response.data,
        isRejectedRefreshToken: false,
        message: '',
      };
    case logoutUserAction + fulfilled:
      // socket.emit(
      //   'client-logout',
      //   prevState.data.user_id,
      //   prevState.data.fcmToken,
      // );
      // socket.disconnect();
      runSocketDisconnect(prevState.data.user_id, prevState.data.fcmToken);

      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        isRejectedRefreshToken: false,
        data: {},
        error: null,
        message: '',
      };
    case refreshTokenAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
        isRejectedRefreshToken: false,
      };
    case refreshTokenAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        isRejectedRefreshToken: true,
        error: action.payload.response.data,
        message: '',
      };
    case refreshTokenAction + fulfilled:
      if (action.payload.data.status === 200) {
        return {
          ...prevState,
          isLoading: false,
          isRejected: false,
          isFulfilled: true,
          isRejectedRefreshToken: false,
          data: {
            ...prevState.data,
            token: action.payload.data.data.token,
            refreshToken: action.payload.data.data.refreshToken,
          },
          error: null,
        };
      } else {
        return {
          ...prevState,
          isLoading: false,
          isRejected: false,
          isFulfilled: true,
          data: {
            ...prevState.data,
          },
          error: 500,
        };
      }

    case putUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
        isRejectedRefreshToken: false,
      };
    case putUserAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        isRejectedRefreshToken: false,
        error: action.payload.response?.data,
      };
    case putUserAction + fulfilled:
      console.log(action.payload);
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        isRejectedRefreshToken: false,
        data: {
          ...prevState.data,
          ...action.payload.data.data,
        },
        error: null,

        message: action.payload.data.message,
      };

    case getUserProfileAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isRejectedRefreshToken: false,
        isFulfilled: false,
      };
    case getUserProfileAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        isRejectedRefreshToken: false,
        error: action.payload.response?.data,
      };
    case getUserProfileAction + fulfilled:
      console.log(action.payload);
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        isRejectedRefreshToken: false,
        data: {
          ...prevState.data,
          ...action.payload.data.data,
        },
        error: null,

        message: action.payload.data.message,
      };
    case storeFcmToken:
      console.log(action.payload);
      return {
        ...prevState,
        data: {
          ...prevState.data,
          fcmToken: action.payload,
        },
      };
    default:
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: false,
        isRejectedRefreshToken: false,
      };
  }
};

export default dataUser;
