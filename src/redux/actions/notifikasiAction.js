import {
  getAllInformasiAction,
  getNotifikasiByUserAction,
  updateNotifikasiByUserAction,
} from './actionTypes';

import {getAllInformasi, getNotifikasiByUser} from '../../utils/http';

export const getNotifikasiByUserActionCreator = (id, token) => ({
  type: getNotifikasiByUserAction,
  payload: getNotifikasiByUser(id, token),
});

export const updateNotifikasiByUserActionCreator = (id, token = null) => ({
  type: updateNotifikasiByUserAction,
  payload: {id},
});
