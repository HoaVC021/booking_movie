import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import cinemaApi from '../../../../apis/cinemaApi';
import movieApi from '../../../../apis/movieApi';

export const getFilmsSync = createAsyncThunk(
  'movie/getAllFilm',
  async (query) => {
    const res = await movieApi.getMoviesSearch(query);
    return res;
  }
);
export const addMovieSync = createAsyncThunk(
  'movie/addMovie',
  async (formData) => {
    try {
      const res = await movieApi.addMovie(formData);
      return res;
    } catch (error) {
      return {
        typeDel: 'failed',
        res: error.response.data,
      };
    }
  }
);
export const editMovieSync = createAsyncThunk(
  'movie/editMovie',
  async (formData) => {
    try {
      const res = await movieApi.editMovie(formData);
      return res;
    } catch (error) {
      return {
        typeDel: 'failed',
        res: error.response.data,
      };
    }
  }
);
export const delMovieSync = createAsyncThunk('movie/delMovie', async (id) => {
  try {
    const res = await movieApi.delMovie(id);
    return res;
  } catch (error) {
    return {
      typeDel: 'failed',
      res: error.response.data,
    };
  }
});
export const getTheaterSystemSync = createAsyncThunk(
  'movie/getTheaterSystem',
  async () => {
    const res = await cinemaApi.getTheatersSystem();
    return res;
  }
);
export const getTheatersSync = createAsyncThunk(
  'movie/getTheaters',
  async (idRap) => {
    const res = await cinemaApi.getTheatersFollowSystem(idRap);
    return res;
  }
);
export const createShowTimeSync = createAsyncThunk(
  'movie/createShowTime',
  async (body) => {
    try {
      const res = await cinemaApi.createShowtime(body);
      return res;
    } catch (error) {
      return {
        status: 'failed',
        res: error.response.data,
      };
    }
  }
);

const initialState = {
  allFilm: [],
  modalVisible: false,
  loading: false,
  movie: {},
  mode: '',
  inputText: '',
  isRefresh: false,
  error: '',
  isCreateTheater: false,
  theaterSystem: [],
  theaters: [],
  raps: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = action.payload;
    },
    setVisible(state, action) {
      state.modalVisible = action.payload;
    },
    setMovie(state, action) {
      state.movie = action.payload;
    },
    setRefresh(state, action) {
      state.isRefresh = action.payload;
    },
    setInputSearch(state, action) {
      state.inputText = action.payload;
    },
    showTheater(state, action) {
      state.isCreateTheater = action.payload;
    },
    setRaps(state, action) {
      state.raps = action.payload;
    },
  },
  extraReducers: {
    [getFilmsSync.pending]: (state) => {
      state.loading = true;
    },
    [getFilmsSync.fulfilled]: (state, action) => {
      state.loading = false;
      state.allFilm = action.payload;
    },
    [getFilmsSync.rejected]: (state) => {
      state.loading = false;
      state.error = 'not find film';
    },
    [delMovieSync.pending]: (state) => {
      state.loading = true;
    },
    [delMovieSync.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [delMovieSync.rejected]: (state) => {
      state.loading = false;
      state.error = 'not delete film';
    },
    [editMovieSync.pending]: (state) => {
      state.loading = true;
    },
    [editMovieSync.fulfilled]: (state) => {
      state.loading = false;
    },
    [editMovieSync.rejected]: (state) => {
      state.loading = false;
      state.error = 'not edit film';
    },
    [addMovieSync.pending]: (state) => {
      state.loading = true;
    },
    [addMovieSync.fulfilled]: (state) => {
      state.loading = false;
    },
    [addMovieSync.rejected]: (state) => {
      state.loading = false;
      state.error = 'not add film';
    },
    [getTheaterSystemSync.pending]: (state) => {
      state.loading = true;
    },
    [getTheaterSystemSync.fulfilled]: (state, action) => {
      state.loading = false;
      state.theaterSystem = action.payload;
    },
    [getTheaterSystemSync.rejected]: (state) => {
      state.loading = false;
      state.error = 'not get values';
    },
    [getTheatersSync.pending]: (state) => {
      state.loading = true;
    },
    [getTheatersSync.fulfilled]: (state, action) => {
      state.loading = false;
      state.theaters = action.payload;
    },
    [getTheatersSync.rejected]: (state) => {
      state.loading = false;
      state.error = 'not get values';
    },
    [createShowTimeSync.pending]: (state) => {
      state.loading = true;
    },
    [createShowTimeSync.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createShowTimeSync.rejected]: (state) => {
      state.loading = false;
      state.error = 'not set values';
    },
  },
});

const { actions, reducer } = movieSlice;

export const {
  setMode,
  setMovie,
  setVisible,
  setRefresh,
  setInputSearch,
  showTheater,
  setRaps,
} = actions;

export default reducer;
