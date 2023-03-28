import {getAllInformasiAction} from './actionTypes';

import {getAllInformasi} from '../../utils/http';

export const getAllInformasiActionCreator = token => ({
  type: getAllInformasiAction,
  payload: getAllInformasi(token),
});
