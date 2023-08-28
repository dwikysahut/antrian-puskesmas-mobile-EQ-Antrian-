// user authentication
export const loginUserAction = 'POST_LOGIN_USER';
export const getUserByIdAction = 'GET_USER_BY_ID';
export const getUserProfileAction = 'GET_USER_PROFILE';
export const putUserAction = 'PUT_USER';
export const refreshTokenAction = 'POST_REFRESH_TOKEN';
export const logoutUserAction = 'POST_LOGOUT';
export const storeFcmToken = 'STORE_FCM_TOKEN';

//informasi
export const getAllInformasiAction = 'GET_ALL_INFORMASI';
//notifikasi
export const getNotifikasiByUserAction = 'GET_NOTIFIKASI_BY_USER';
export const updateNotifikasiByUserAction = 'UPDATE_NOTIFIKASI_BY_USER';

//Praktek
export const getAllPraktekAction = 'GET_ALL_PRAKTEK';
//Kartu keluarga
export const getKartuKeluargaByID = 'GET_KARTU_KELUARGA_BY_ID';
//Pasien
export const getAllPasienByNoKK = 'GET_ALL_PASIEN_BY_NO_KK';

export const pending = '_PENDING';
export const rejected = '_REJECTED';
export const fulfilled = '_FULFILLED';
