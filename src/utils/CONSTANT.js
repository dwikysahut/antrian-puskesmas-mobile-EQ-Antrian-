// import {REACT_APP_API} from '@env';

const swalType = {
  success: 'success',
  warning: 'warning',
  error: 'error',
};
const successfullyMessage = {
  post: 'Berhasil Menambahkan data',
  edit: 'Berhasil Mengubah data',
  delete: 'Berhasil Menghapus data',
};

const loginMessage = {
  success: 'Login Berhasil',
  failed: 'Login Gagal...',
};
const failedMessage = {
  post: 'Gagal Menambahkan data',
  edit: 'Gagal Mengubah data',
  delete: 'Gagal Menghapus data',
};
const confirmationMessage = {
  confirm: 'Yakin Menghapus data ?',
};

const errorType = {
  TOKEN_ERROR: 'JsonWebTokenError',
  TOKEN_EXPIRED: 'TokenExpiredError',
  NO_ACCESS: "You don't have access",
  TOKEN_DELETED: 'Token Null, Please Login',
  EMAIL_UNVERIFY:
    'Email belum diverifikasi, silahkan melakukan verifikasi email',
};

const URL_BASE = 'https://dad6-125-166-3-241.ap.ngrok.io';
const URL_BASE_IMAGE = `${URL_BASE}/public/image`;

export {
  swalType,
  successfullyMessage,
  failedMessage,
  confirmationMessage,
  errorType,
  URL_BASE,
  URL_BASE_IMAGE,
  loginMessage,
};
