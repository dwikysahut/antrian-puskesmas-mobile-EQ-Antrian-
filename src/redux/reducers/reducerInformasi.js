/* eslint-disable default-param-last */
/* eslint-disable default-case */
import {
  getAllInformasiAction,
  fulfilled,
  rejected,
  pending,
} from '../actions/actionTypes';

const initialValue = {
  data: {},
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  error: null,
  message: '',
};

const dataInformasi = (prevState = initialValue, action) => {
  switch (action.type) {
    case getAllInformasiAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getAllInformasiAction + rejected:
      console.log(action.payload);

      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        error: action.payload.response?.data,
      };
    case getAllInformasiAction + fulfilled:
      console.log(action.payload);
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        data: action.payload.data.data,
        error: null,

        message: action.payload.data.message,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default dataInformasi;
