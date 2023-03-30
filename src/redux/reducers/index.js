/* eslint-disable no-param-reassign */
import {combineReducers} from 'redux';
import {REHYDRATE} from 'redux-persist/lib/constants';
import {logoutUserAction} from '../actions/actionTypes';
import reducerUser from './reducerUser';
import reducerInformasi from './reducerInformasi';
import reducerPraktek from './reducerPraktek';

const combinedReducers = combineReducers({
  reducerUser,
  reducerInformasi,
  reducerPraktek,
});
const rootReducer = (state, action) => {
  if (action.type === logoutUserAction) {
    delete state.reducerUser;
    // delete state.antrian;
    // state = undefined
  }
  if (action.type === REHYDRATE) {
    state = action.payload;
    delete state?.reducerUser?.data.password;
    delete state?.reducerUser?.isFulfilled;
    delete state?.reducerUser?.isLoading;
    delete state?.reducerUser?.isRejected;
    delete state?.reducerUser?.message;
    delete state?.reducerUser?.error;
    delete state?.reducerUser?.data.verif_akun;
    delete state?.reducerUser?.data.kode_verifikasi_email;
    delete state?.reducerUser?.data.created_at;
    delete state?.reducerUser?.data.updated_at;
    delete state?.reducerUser?.data.verif_email;
  }
  return combinedReducers(state, action);
};
export default rootReducer;
