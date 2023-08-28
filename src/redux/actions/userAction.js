import {
  loginUserAction,
  getUserByIdAction,
  logoutUserAction,
  refreshTokenAction,
  putUserAction,
  getUserProfileAction,
  storeFcmToken,
} from './actionTypes';

import {
  loginUser,
  logoutUser,
  refreshToken,
  getUserById,
  putUserProfile,
  getUserProfile,
} from '../../utils/http';

export const getUserByIdActionCreator = (id, token) => ({
  type: getUserByIdAction,
  payload: getUserById(id, token),
});

export const loginUserActionCreator = body => ({
  type: loginUserAction,
  payload: loginUser(body),
});
export const storeFcmTokenActionCreator = body => ({
  type: storeFcmToken,
  payload: body,
});

export const logoutUserActionCreator = token => ({
  type: logoutUserAction,
  payload: logoutUser({refreshToken: token}),
});
export const refreshTokenActionCreator = token => ({
  type: refreshTokenAction,
  payload: refreshToken({refreshToken: token}),
});
export const putUserActionCreator = (id, body, token) => ({
  type: putUserAction,
  payload: putUserProfile(id, body, token),
});
export const getUserProfileCreator = (id, token) => ({
  type: getUserProfileAction,
  payload: getUserProfile(id, token),
});
