import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import movieApi from '../../../apis/movieApi';

export const getFilm = createAsyncThunk(
  'movie-detail/getFilm',
  async (param) => {
    const data = await movieApi.getFilm(param);
    return data;
  }
);
export const getInfoShowTimes = createAsyncThunk(
  'movie-detail/getShowtimes',
  async (param) => {
    const data = await movieApi.getInfoShowTimes(param);
    return data.heThongRapChieu;
  }
);

const initialState = {
  rap: '',
  time: '',
  cumRapChieu: [],
  lichChieuPhim: {},
  listGioChieu: [],
  movie: {},
  infoShowtimes: [],
  loading: false,
  open: false,
  errors: '',
};

const movieDetailSlice = createSlice({
  name: 'movie-detail',
  initialState,
  reducers: {
    toggleTrailer(state, action) {
      console.log(action.payload);
      state.open = action.payload;
    },
    getShowtimes(state, action) {
      state.lichChieuPhim = action.payload;
    },
    getTheaters(state, action) {
      state.cumRapChieu = action.payload;
    },
    getListTime(state, action) {
      state.listGioChieu = action.payload;
    },
    getTheater(state, action) {
      state.rap = action.payload;
    },
    getTime(state, action) {
      state.time = action.payload;
    },
  },
  extraReducers: {
    [getFilm.pending]: (state) => {
      state.loading = true;
    },
    [getFilm.fulfilled]: (state, action) => {
      console.log(action);
      state.movie = action.payload;
      state.loading = false;
    },
    [getFilm.rejected]: (state) => {
      state.loading = false;
      state.errors = 'test';
    },
    [getInfoShowTimes.pending]: (state) => {
      state.loading = true;
    },
    [getInfoShowTimes.fulfilled]: (state, action) => {
      state.loading = false;
      state.infoShowtimes = action.payload;
    },
    [getInfoShowTimes.rejected]: (state) => {
      state.loading = false;
      state.errors = '';
    },
  },
});

const { actions, reducer } = movieDetailSlice;

export const {
  toggleTrailer,
  getShowtimes,
  getTheaters,
  getListTime,
  getTheater,
  getTime,
} = actions;

export default reducer;
