import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookingFooter from '../BookingFooter/BookingFooter';
import BookingHeader from '../BookingHeader/BookingHeader';
import Screen from '../Screen/Screen';
import SeatContainer from '../SeatContainer/SeatContainer';
import './BookingContainerstyle.css';
import { style } from './style';


function BookingContainer() {

  const [seatbook, setSeatbook] = useState({
    listseat: '',
    totalprice: 0,
    seats: [],
  });
  const isloading = useSelector((state) => state.movieBooking.isLoading);
  const dispatch = useDispatch();
  const { container } = style;

  function getBookSeats(seats) {
    const getAlpha = seats.map((seat) => seat.alphaGhe);
    const seatbookstr = getAlpha.join(', ');
    setSeatbook({
      listseat: seatbookstr,
      totalprice: handlePrice(seats),
      seats: seats,
    });
  }

  const handlePrice = (arr) => {
    let totalprice = 0;
    arr.forEach((item) => (totalprice += item.giaVe));
    return totalprice;
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '75vw',
      '@media only screen and (max-width: 1026px)': {
        width: '100vw',
      },
    },
  }));

  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <BookingHeader />
        <Screen />
        <SeatContainer getBookSeats={getBookSeats} seatbook={seatbook} />

        <BookingFooter seatsbook={seatbook} />
      </Box>
    </>
  );
}

export default BookingContainer;
