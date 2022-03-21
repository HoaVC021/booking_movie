import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../../apis/userApi';
import getToken from '../../../utils';
// import token from '../../../utils';

export const getProfile = createAsyncThunk(
  'profile/getInfo',
  async (taiKhoan) => {
    const res = await userApi.getProfile(taiKhoan);
    return res;
  }
);
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (params) => {
    const token = getToken();
    const response = await userApi.updateProfile(token, params.data);
    return response;
  }
);
const initialState = {
  profile: {},
  loading: false,
  error: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [getProfile.pending]: (state) => {
      state.loading = true;
    },
    [getProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    },
    [getProfile.rejected]: (state) => {
      state.loading = false;
      state.error = 'cannot get profile';
    },
    //Update Profile
    // update profile user reducer
    [updateProfile.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },

    [updateProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.profile = { ...state.profile, ...action.payload };
    },
    [updateProfile.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { actions, reducer } = profileSlice;

export const {} = actions;

export default reducer;
