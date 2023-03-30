import {getAllPraktekAction} from './actionTypes';

import {getAllPraktek} from '../../utils/http';

export const getAllPraktekActionCreator = token => ({
  type: getAllPraktekAction,
  payload: getAllPraktek(token),
});
