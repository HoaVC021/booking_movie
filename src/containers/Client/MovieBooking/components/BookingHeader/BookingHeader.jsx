import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { style } from './style.js';

function BookingHeader() {
  const { container, cinema_title, detail, cinema_detail, time } = style;
  const navigate = useNavigate();
  const stylebox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px',
    borderRadius: '10px',
    boxShadow: 24,
    backgroundColor: 'rgba(44,52,63,255)',
    color: '#ffff',
    textAlign: 'center',
    p: 4,
  };
  const bookInfo = useSelector((state) => state.movieBooking.bookList);
  const ref = useRef();
  const [timmer, setTimer] = useState(60);
  const [ismodal, setIsmodal] = useState(false);
  useEffect(() => {
    ref.current = timmer;
    let intervaltime = setInterval(() => {
      ref.current = ref.current - 1;
      let timecurrent;
      if (ref.current < 10) timecurrent = '0' + ref.current;
      else timecurrent = ref.current;
      setTimer(timecurrent);
      if (ref.current === 0) {
        clearInterval(intervaltime);
        setIsmodal(true);
      }
    }, 1000);

    return () => { };
  }, []);

  return (
    <>
      <div style={{ ...container }}>
        <div style={{ ...detail }}>
          <div style={{ ...cinema_title }}>
            Hệ thống rạp: {bookInfo?.thongTinPhim?.tenCumRap}
          </div>
          <div style={{ ...cinema_detail }}>
            Giờ chiếu: {bookInfo?.thongTinPhim?.gioChieu}
          </div>
        </div>
        <div style={{ ...time }}>{`00:${timmer}`}</div>
      </div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={ismodal}
        // onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={ismodal}>
          <Box sx={stylebox}>
            <img
              style={{ width: '100px', height: '100px', color: 'white' }}
              src="https://i.pinimg.com/originals/7f/c6/30/7fc6309bbf5a11240df530589c7816a5.gif"
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              Times up! Please
              <a onClick={() => navigate(-1)}> click here</a> to re-book your
              tickets!
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default BookingHeader;
