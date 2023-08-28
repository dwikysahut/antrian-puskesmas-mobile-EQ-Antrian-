import {getAllPasienByNoKK} from './actionTypes';

import {getAllPasienNoKK} from '../../utils/http';

export const getAllPasienByNoKKActionCreator = (id, token) => ({
  type: getAllPasienByNoKK,
  payload: getAllPasienNoKK(id, token),
});
