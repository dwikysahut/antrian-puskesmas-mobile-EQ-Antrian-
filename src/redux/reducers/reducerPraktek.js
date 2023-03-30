import {
  getAllPraktekAction,
  fulfilled,
  rejected,
  pending,
} from '../actions/actionTypes';

const initialValue = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  error: null,
  message: '',
};

const dataPraktek = (prevState = initialValue, action) => {
  switch (action.type) {
    case getAllPraktekAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getAllPraktekAction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        data: [],
        error: action.payload.response?.data,
      };
    case getAllPraktekAction + fulfilled:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
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
export default dataPraktek;
