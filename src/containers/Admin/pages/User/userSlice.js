import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../../../apis/userApi';
import getToken from '../../../../utils';
// import TOKEN from '../../../../utils';
// Tạo login action (async)
export const getAllusers = createAsyncThunk('user/getAlluser', async () => {
  const response = await userApi.getallUser();
  return response;
});
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data) => {
    const TOKEN = getToken();
    const response = await userApi.updateProfile(TOKEN, data);
    return response;
  }
);
export const createUser = createAsyncThunk('user/createUser', async (data) => {
  const TOKEN = getToken();
  const response = await userApi.createUser(TOKEN, data);
  return response;
});
export const deleteUser = createAsyncThunk('user/deleteUser', async (data) => {
  const TOKEN = getToken();
  const response = await userApi.deleteUser(TOKEN, data);
  return response;
});

export const filterUser = createAsyncThunk('user/filterUser', async (data) => {
  const response = await userApi.filterUser(data);
  return response;
});

const adminuserSlice = createSlice({
  name: 'user',
  // Thêm 1 số state như trạng thái loading, báo lỗi và thông tin user đang đăng nhập
  initialState: {
    isLoading: false,
    errorMessage: '',
    users: [],
  },

  // Các action bình thường (sync action)
  // reducers: {
  //   // Logout không gọi API mà chỉ đơn giản là cập nhật state
  //   logout: (state) => {
  //     state.currentUser = null;
  //     state.errorMessage = '';
  //   },
  // },

  extraReducers: {
    //get data user reducer
    [getAllusers.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    },

    [getAllusers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = [...action.payload];
    },
    [getAllusers.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    },

    // update profile user reducer
    [updateProfile.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    },

    [updateProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = [...state.users].map((item) => {
        if (item.taiKhoan === action.payload.taiKhoan) {
          item = {
            email: action.payload.email,
            hoTen: action.payload.hoTen,
            maLoaiNguoiDung:
              action.payload.loaiNguoiDung === 'Khách hàng'
                ? 'KhachHang'
                : 'QuanTri',
            matKhau: action.payload.matKhau,
            soDt: action.payload.soDT,
            taiKhoan: action.payload.taiKhoan,
          };
          console.log('item', action.payload);
        }
        return item;
      });
    },
    [updateProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    },

    //Create user reducer
    [createUser.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    },

    [createUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      // state.users = [...state.users, action.payload];
      state.users.unshift(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    },

    //delete user reducer
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    },

    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log('truoc', action);
      state.users = [...state.users].filter(
        (item) => item.taiKhoan !== action.meta.arg
      );
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false;
      console.log('reducer', action);
      state.errorMessage = action.error.message;
    },

    //filter user reducer
    [filterUser.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = '';
    },

    [filterUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      console.log('filter', action.payload);
    },
    [filterUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    },
  },
});

const { actions, reducer } = adminuserSlice;

export const { addSeat } = actions;

export default reducer;
