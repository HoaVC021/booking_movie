import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import Alert from '../Alert/Alert';

export const loginUser = createAsyncThunk('auth/login', async (body) => {
  const res = await axios.post(
    `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap`,
    body
  );
  console.log(res.data);
  return res.data;
});
export const Signup = createAsyncThunk('auth/signup', async (body) => {
  const res = await axios.post(
    `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy`,
    body
  );
  return res;
});

// Config slice
const initialState = {
  currentUser: {},
  token: '',
  role: '',
  checkPath: true,
  // errorlogin: false,
  // alerts: [],
};

// console.log(currentUser)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state, action) {
      console.log(action.payload);
      state.role = 'KhachVangLai';
      state.token = '';
      state.currentUser = {};
      // state.currentUser = {};
    },
    createAlert: (state, action) => {
      state.alerts.push({
        message: action.payload.message,
        type: action.payload.type,
      });
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    checkPath(state, action) {
      state.checkPath = action.payload;
    },
    // handleError: (state,action) => {
    //   state.errorlogin = false;
    // }
  },
  // Start login request

  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },

    // Request successful
    [loginUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.currentUser = action.payload;
      state.token = action.payload.accessToken;
      state.loading = false;
      // state.errorlogin = false;
    },
    // Request error
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.errors = 'Something went wrong! 😩';
      // state.errorlogin = true;
      //  <Alert />
    },
    // [loginUser.rejected]: (state, action) => {
    //   state.alerts.push({ message: action.error.message, type: 'error' });
    // },
    [Signup.pending]: (state) => {
      state.loading = true;
    },
    [Signup.fulfilled]: (state, action) => {
      state.loading = false;
      // state.infoShowtimes = action.payload;
    },
    [Signup.rejected]: (state) => {
      state.loading = false;
      state.errors = '';
    },
  },
});

const { actions, reducer } = authSlice;
export const { logout, setRole, checkPath } = actions;
// export const selectUser = (state) => state.user.currentUser;

export default reducer;
