import getToken from '../utils';
import axiosClient from './axiosClient';
// import TOKEN from '../utils';

const bookingApi = {
  getBookList(params) {
    const url = `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${params}`;
    return axiosClient.get(url);
  },
  postBookList(params) {
    const token = getToken();
    const url = `/api/QuanLyDatVe/DatVe`;
    return axiosClient.post(url, params.data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
export default bookingApi;
