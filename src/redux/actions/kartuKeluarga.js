import {getKartuKeluargaByID} from './actionTypes';

import {getKartuKeluargaById} from '../../utils/http';

export const getKartuKeluargaByIdActionCreator = (id, token) => ({
  type: getKartuKeluargaByID,
  payload: getKartuKeluargaById(id, token),
});
