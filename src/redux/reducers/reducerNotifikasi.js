/* eslint-disable default-param-last */
/* eslint-disable default-case */
import {
  getNotifikasiByUserAction,
  fulfilled,
  rejected,
  pending,
  updateNotifikasiByUserAction,
} from '../actions/actionTypes';

const initialValue = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  error: null,
  message: '',
};

const dataNotifikasi = (prevState = initialValue, action) => {
  switch (action.type) {
    case getNotifikasiByUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getNotifikasiByUserAction + rejected:
      // console.log(action.payload);

      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        error: action.payload.response?.data,
      };
    case getNotifikasiByUserAction + fulfilled:
      let dataFromLocalNotifOnly = [];
      let dataFromRequestOnly = [];
      //kalo user id beda maka ambil data terbaru semua dari payload

      if (action.payload.data?.data[0]?.user_id != prevState.data[0]?.user_id) {
        dataFromLocalNotifOnly = action.payload.data.data;
      } else {
        dataFromLocalNotifOnly = prevState.data?.filter(
          item =>
            item.jenis_notifikasi < 2 ||
            (item.jenis_notifikasi == 2 && item.aksi > 0),
        );
        dataFromRequestOnly = action.payload.data.data.filter(
          (item, i) =>
            !dataFromLocalNotifOnly?.some(
              itemCompare => itemCompare.id_notifikasi == item.id_notifikasi,
            ),
        );
      }

      console.log(action.payload.data.data);
      return {
        ...prevState,
        isLoading: false,
        isRejected: false,
        isFulfilled: true,
        data: prevState.data?.length
          ? [...dataFromLocalNotifOnly, ...dataFromRequestOnly]
          : action.payload.data.data,
        error: null,

        message: action.payload.data.message,
      };
    case updateNotifikasiByUserAction:
      console.log(action.payload.id);
      const newData = prevState.data.map(item => {
        if (item.id_notifikasi == action.payload.id) {
          return {
            ...item,
            is_opened: 1,
          };
        }
        return item;
      });
      return {
        ...prevState,
        data: newData,
        error: null,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default dataNotifikasi;
