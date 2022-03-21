import getToken from '../utils';
import axiosClient from './axiosClient';
// api/productApi.js

// import token from '../utils';
class MovieApi {
  //   getallUser = (token) => {
  //     const url = "/api/QuanLyNguoiDung/LayDanhSachNguoiDung";
  //     return axiosClient.get(url);
  //   };

  getBanners = () => {
    const url = '/api/QuanLyPhim/LayDanhSachBanner';
    return axiosClient.get(url);
  };
  getMovies = (pagination) => {
    const url = `/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${pagination.currentPage}&soPhanTuTrenTrang=${pagination.count}`;
    return axiosClient.get(url);
  };
  getMoviesSearch = (query) => {
    let url;
    if (query) {
      url = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${query}`;
    } else url = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`;
    return axiosClient.get(url);
  };
  getTheaters = () => {
    const url = '/api/QuanLyRap/LayThongTinHeThongRap';
    return axiosClient.get(url);
  };
  getBranchs = (param) => {
    const url = `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${param}&maNhom=GP01`;
    return axiosClient.get(url);
  };
  getFilm(param) {
    const url = `/api/QuanLyPhim/LayThongTinPhim?MaPhim=${param}`;
    return axiosClient.get(url);
  }
  getInfoShowTimes(param) {
    const url = `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${param}`;
    return axiosClient.get(url);
  }
  addMovie(formData) {
    const token = getToken();
    const url = `/api/QuanLyPhim/ThemPhimUploadHinh`;
    return axiosClient.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  editMovie(formData) {
    const token = getToken();
    const url = `/api/QuanLyPhim/CapNhatPhimUpload`;
    return axiosClient.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  delMovie(id) {
    const token = getToken();
    const url = `/api/QuanLyPhim/XoaPhim?maPhim=${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
const movieApi = new MovieApi();
export default movieApi;
