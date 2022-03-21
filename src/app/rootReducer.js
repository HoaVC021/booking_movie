import bookingSlice from '../containers/Client/MovieBooking/bookingSlice';
import adminuserSlice from '../containers/Admin/pages/User/userSlice';
import homePageSlice from '../containers/Client/HomePage/homePageSlice';
import movieDetailSlice from '../containers/Client/MovieDetail/movieDetailSlice';
import movieSlice from '../containers/Admin/pages/Movie/movieSlice';
import profileSlice from '../containers/Client/Profile/profileSlice';
import authSlice from '../containers/Auth/authSlice';
import movieBookingSlice from '../containers/Client/MovieBooking/bookingSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  booking: bookingSlice,
  user: adminuserSlice,
  home: homePageSlice,
  movieDetail: movieDetailSlice,
  movie: movieSlice,
  auth: authSlice,
  movieBooking: movieBookingSlice,
  profile: profileSlice,
});
