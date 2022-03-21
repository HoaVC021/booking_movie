import axios from 'axios';
import getToken from '../utils';
import axiosClient from './axiosClient';
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTIzQGFkbWluMTAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJRdWFuVHJpIiwibmJmIjoxNjQwMjI3NDg4LCJleHAiOjE2NDAyMzEwODh9.01Lb0Y50VTbBKzh1Brsy9mrzDbxilq2bb7W-mdLYT7I';

class CinemaApi {
  getTheatersSystem() {
    const url = '/api/QuanLyRap/LayThongTinHeThongRap';
    return axiosClient.get(url);
  }
  getTheatersFollowSystem(idRap) {
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${idRap}`;
    return axiosClient.get(url);
  }
  createShowtime(body) {
    const token = getToken();
    const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu`;
    return axiosClient.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
const cinemaApi = new CinemaApi();
export default cinemaApi;
