import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import movieApi from '../../../apis/movieApi';

export const getBanners = createAsyncThunk('home/getBanners', async () => {
  const banners = await axios.get(
    'http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner'
  );
  return banners.data.content;
});
export const getMovies = createAsyncThunk(
  'home/getMovies',
  async (pagination) => {
    const movies = await movieApi.getMovies(pagination);
    return movies;
  }
);

export const getTheaters = createAsyncThunk('home/getTheaters', async () => {
  const theaters = await movieApi.getTheaters();
  return theaters;
});

export const getBranchs = createAsyncThunk('home/getBranchs', async (param) => {
  const branchs = await movieApi.getBranchs(param);
  return branchs;
});

const homePageSlice = createSlice({
  name: 'home',
  initialState: {
    banners: [],
    movieList: [],
    theaters: [],
    pagination: {
      currentPage: 1,
      count: 8,
    },
    branchs: [],
    loading: false,
    errors: '',
  },

  reducers: {
    // addSeat(state, action) {
    //   state.seats.push(action.payload);
    // },
    // changeTextTodo(state, action) {
    //   return { ...state, inputText: action.payload };
    // },
  },
  extraReducers: {
    [getBanners.pending]: (state) => {
      state.loading = true;
    },
    [getBanners.fulfilled]: (state, action) => {
      state.loading = false;
      state.banners = action.payload;
    },
    [getBanners.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.error;
    },

    [getMovies.pending]: (state) => {
      state.loading = true;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.loading = false;
      state.movieList = action.payload.items;
    },
    [getMovies.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.error;
    },
    [getTheaters.pending]: (state) => {
      state.loading = true;
    },
    [getTheaters.fulfilled]: (state, action) => {
      state.loading = false;
      state.theaters = action.payload;
    },
    [getTheaters.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.error;
    },
    [getBranchs.pending]: (state) => {
      state.loading = true;
    },
    [getBranchs.fulfilled]: (state, action) => {
      state.loading = false;
      state.branchs = action.payload;
    },
    [getBranchs.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.error;
    },
  },
});
const { actions, reducer } = homePageSlice;

export const {} = actions;

export default reducer;
