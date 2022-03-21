import axiosClient from './axiosClient';
// api/productApi.js

class UserApi {
  loginUser = (params) => {
    const url = 'api/QuanLyNguoiDung/DangNhap';
    return axiosClient.post(url, params);
  };
  regisUser = (params) => {
    const url = 'api/QuanLyNguoiDung/DangKy';
    return axiosClient.post(url, params);
  };
  getallUser = (token) => {
    const url = 'api/QuanLyNguoiDung/LayDanhSachNguoiDung';
    return axiosClient.get(url);
  };
  getProfile = (body) => {
    const url = 'api/QuanLyNguoiDung/ThongTinTaiKhoan';
    return axiosClient.post(url, body);
  };
  updateProfile = (token, data) => {
    const url = 'api/QuanLyNguoiDung/CapNhatThongTinNguoiDung';
    return axiosClient.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  createUser = (token, data) => {
    const url = 'api/QuanLyNguoiDung/ThemNguoiDung';
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  deleteUser = (token, data) => {
    const url = `api/QuanLyNguoiDung/XoaNguoiDung?MaNhom=GP01&taiKhoan=${data}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  filterUser = (data) => {
    const url = `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${data}`;
    return axiosClient.get(url, data);
  };
}
const userApi = new UserApi();
export default userApi;
