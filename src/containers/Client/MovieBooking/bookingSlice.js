import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookingApi from '../../../apis/bookingApi';
// Tạo login action (async)
export const getBooklist = createAsyncThunk(
  'booking/getBooklist',
  async (params) => {
    const response = await bookingApi.getBookList(params);
    return response;
  }
);
export const postBooklist = createAsyncThunk(
  'booking/postBooklist',
  async (params) => {
    const response = await bookingApi.postBookList(params);
    return response;
  }
);
const movieBookingSlice = createSlice({
  name: 'user',
  // Thêm 1 số state như trạng thái loading, báo lỗi và thông tin user đang đăng nhập
  initialState: {
    ishowAlert:false,
    isLoadingpost: false,
    isLoading: false,
    errorMessage: '',
    bookList:{}
  },
  reducers: {
    showAlert(state) {
      state.ishowAlert = true;
    },
    closeAlert(state) {
      state.ishowAlert = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooklist.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getBooklist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookList = action.payload;
    });
    builder.addCase(getBooklist.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
    builder.addCase(postBooklist.pending, (state) => {
      state.isLoadingpost = true;
    });

    builder.addCase(postBooklist.fulfilled, (state, action) => {
      state.isLoadingpost = false;
      // state.bookList = action.payload;
      console.log(action.payload);
    });
    builder.addCase(postBooklist.rejected, (state, action) => {
      state.isLoadingpost = false;
      state.errorMessage = action.payload.message;
    });
  },
});

const { actions, reducer } = movieBookingSlice;

export const {showAlert,closeAlert} = actions;

export default reducer;