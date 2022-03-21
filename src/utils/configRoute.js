import Admin from '../containers/Admin/Admin';
import Homepage from '../containers/Client/HomePage/Homepage';
import MovieBooking from '../containers/Client/MovieBooking/MovieBooking';
import MovieDetail from '../containers/Client/MovieDetail/MovieDetail';
import Profile from '../containers/Client/Profile/Profile';

const configRoute = [
  {
    path: '/',
    element: Homepage,
    role: ['KhachHang', 'KhachVangLai'],
  },
  {
    path: '/home',
    element: Homepage,
    role: ['KhachHang', 'KhachVangLai'],
  },
  {
    path: 'admin',
    element: Admin,
    role: ['QuanTri'],
  },
  {
    path: 'detail/:id',
    element: MovieDetail,
    role: ['KhachHang', 'KhachVangLai'],
  },
  {
    path: 'ticketroom/:maLichChieu',
    element: MovieBooking,
    role: ['KhachHang', 'KhachVangLai'],
  },
  {
    path: 'profile/:taiKhoan',
    element: Profile,
    role: ['KhachHang'],
  },
];
export default configRoute;
