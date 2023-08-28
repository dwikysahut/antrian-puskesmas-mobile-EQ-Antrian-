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

const CHANNEL_ID = 'EQ-Puskesmas-Notification';

const URL_BASE = 'https://4539-36-82-11-154.ngrok-free.app';
const URL_SOCKET = 'https://localhost:5000';
const URL_BASE_IMAGE = `${URL_BASE}/public/image`;

export {
  swalType,
  successfullyMessage,
  failedMessage,
  CHANNEL_ID,
  confirmationMessage,
  errorType,
  URL_BASE,
  URL_SOCKET,
  URL_BASE_IMAGE,
  loginMessage,
};
