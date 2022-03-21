import { SmileOutlined } from '@ant-design/icons';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { unwrapResult } from '@reduxjs/toolkit';
import { notification } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { checkPath } from '../../../../Auth/authSlice';
import { getBooklist, postBooklist } from '../../bookingSlice';
import { style } from './style';
// import token from "../../../../../utils";
function BookingFooter({ seatsbook }) {
  let { maLichChieu } = useParams();
  const navigate = useNavigate();
  const bookInfo = useSelector((state) => state.movieBooking.bookList);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector(state => state.auth.currentUser)
  const isloadingpost = useSelector(
    (state) => state.movieBooking.isLoadingpost
  );
  const dispatch = useDispatch();
  const getbooklist = async () => {
    const data = await dispatch(getBooklist(maLichChieu));
    const dataResult = unwrapResult(data);
    console.log('dataResult', dataResult);
  };
  console.log('consolefooter', seatsbook);
  const {
    container,
    seatbooking,
    totalprice,
    booking,
    dialogTitle,
    rowModal,
    rowLeft,
    rowRight,
  } = style;
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatMoney = (text) => {
    return text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };
  const postbooklist = async (params) => {
    try {
      const data = await dispatch(postBooklist(params));
      const dataResult = unwrapResult(data);
      // setbookInfo(dataResult);
      console.log('dataResult', dataResult);
      setOpen(false);
      openNotification();
      setTimeout(() => {
        getbooklist();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProceed = () => {
    if (token) {
      const datapost = {
        data: {
          maLichChieu: maLichChieu,
          danhSachVe: [...seatsbook.seats],
          taiKhoanNguoiDung: user.taiKhoan,
        },
      };
      postbooklist(datapost);
    } else {
      setOpen(false);
      openLoginNotification();
    }
  };
  const openNotification = (seats) => {
    notification.info({
      message: `Mua vé thành công`,
      description: `Cảm ơn bạn đã ủng hộ Griffin, Chúc bạn xem phim vui vẻ`,
      placement: 'botRight',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };
  const openLoginNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          navigate('/auth');
          notification.close(key);
        }}
      >
        Login
      </Button>
    );
    dispatch(checkPath(false))
    notification.open({
      message: 'You are not logged in',
      placement: 'botRight',
      description: 'You must be logged in to book tickets',
      btn,
      key,
    });
  };
  return (
    <div style={{ ...container }}>
      <div style={{ width: '60%' }}>
        <div>Your Seat</div>
        <div style={{ ...seatbooking }}>{seatsbook.listseat}</div>
      </div>
      <div>
        <div>Total Price</div>
        <div style={{ ...totalprice }}>
          {formatMoney(seatsbook.totalprice)}đ
        </div>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}
      >
        {seatsbook.seats.length > 0 ? (
          <Button
            onClick={handleClickOpen}
            style={{
              ...booking,
              color: 'white',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            BOOKING
          </Button>
        ) : (
          <Button
            style={{
              ...booking,
              color: 'white',
              padding: '5px 10px',
              cursor: 'no-drop',
            }}
          >
            BOOKING
          </Button>
        )}
      </div>
      <div>
        <Dialog
          open={open}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle style={{ fontWeight: 'bold', textAlign: 'center' }}>
            {'BOOKING SUMMERY'}
          </DialogTitle>
          <DialogContent>
            <div
              style={{
                width: '100%',
                border: 'dashed 0.5px rgb(85, 96, 255)',
                marginBottom: '5px',
              }}
            ></div>
            <div
              style={{
                ...rowModal,
              }}
            >
              <div>
                <div style={{ ...dialogTitle }}>
                  {bookInfo?.thongTinPhim?.tenPhim}
                </div>
                <div>2D | DIGITAL</div>
              </div>
            </div>
            <div
              style={{
                ...rowModal,
              }}
            >
              <div style={{ ...rowLeft }}>
                <div style={{ ...dialogTitle, width: '170px' }}>
                  {bookInfo?.thongTinPhim?.tenCumRap}
                </div>
                <div>
                  {bookInfo?.thongTinPhim?.ngayChieu},
                  {bookInfo?.thongTinPhim?.gioChieu}
                </div>
              </div>
              <div style={{ ...rowRight }}>
                <div style={{ ...dialogTitle }}>{seatsbook.seats.length}</div>
                <div>TICKETS</div>
              </div>
            </div>
            <div
              style={{
                ...rowModal,
              }}
            >
              <div style={{ ...rowLeft }}>
                <div style={{ ...dialogTitle }}>POSITION</div>
              </div>
              <div style={{ ...rowRight }}>
                <div style={{ ...dialogTitle, whiteSpace: 'none' }}>
                  {seatsbook.listseat}
                </div>
              </div>
            </div>
            <div
              style={{
                ...rowModal,
              }}
            >
              <div style={{ ...rowLeft }}>
                <div style={{ ...dialogTitle }}>TICKETS PRICE</div>
              </div>
              <div style={{ ...rowRight }}>
                <div style={{ ...dialogTitle }}>
                  {formatMoney(seatsbook.totalprice)}
                </div>
              </div>
            </div>
            <div
              style={{
                width: '100%',
                border: 'dashed 0.5px rgb(85, 96, 255)',
                marginTop: '5px',
              }}
            ></div>
          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
            {isloadingpost ? (
              <Button
                onClick={handleProceed}
                style={{ ...booking, color: 'white', padding: '5px 10px' }}
              >
                <CircularProgress size={20} color="secondary" />
              </Button>
            ) : (
              <Button
                onClick={handleProceed}
                style={{ ...booking, color: 'white', padding: '5px 10px' }}
              >
                PROCEED
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default BookingFooter;
