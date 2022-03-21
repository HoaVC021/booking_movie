import Box from '@mui/material/Box';
import React from 'react';
import { useSelector } from 'react-redux';
import './MovieDetailstyle.css';
import { style } from './style';

function MovieDetail() {
  const bookInfo = useSelector((state) => state.movieBooking.bookList);
  console.log(">>asdf", bookInfo)

  const { detail_box, background_box, back_image, movie_name, movie_date } =
    style;
  return (
    <div className="reponsive_movieDetail">
      <Box style={{ ...detail_box }}>
        <Box style={{ ...background_box }} />
        <img
          style={{ ...back_image }}
          src={`${bookInfo?.thongTinPhim?.hinhAnh}`}
          alt="movie detail"
        />
        <div style={{ ...movie_name }}>{bookInfo?.thongTinPhim?.tenPhim}</div>
        <div style={{ ...movie_date }}>Ngày khởi chiếu: {bookInfo?.thongTinPhim?.ngayChieu}</div>
      </Box>
    </div>
  );
}

export default MovieDetail;
