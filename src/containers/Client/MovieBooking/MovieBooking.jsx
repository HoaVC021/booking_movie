import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CircularIndeterminate from '../../../components/Loading/Loading';
import { closeAlert, getBooklist } from './bookingSlice';
import BookingContainer from './components/BookingContainer/BookingContainer';
import MovieDetail from './components/MovieDetail/MovieDetail';
import './Moviestyle.css';
import { style } from './style';

function MovieBooking() {

  let { maLichChieu } = useParams();
  const [bookInfo, setbookInfo] = useState({});
  const handleCloseAler = () => {
    dispatch(closeAlert());
  };
  const { container } = style;
  const isloading = useSelector((state) => state.movieBooking.isLoading);
  const dispatch = useDispatch();
  const getbooklist = async () => {
    const data = await dispatch(getBooklist(maLichChieu));
    const dataResult = unwrapResult(data);
    setbookInfo(dataResult);
    console.log('dataResult', dataResult);
  };

  useEffect(() => {
    getbooklist();
  }, []);

  return (
    <>
      <div style={{ ...container }}>
        {isloading ? (
          <CircularIndeterminate />
        ) : (
          <>
            <MovieDetail />
            <BookingContainer />
          </>
        )}
      </div>
    </>
  );
}

export default MovieBooking;
