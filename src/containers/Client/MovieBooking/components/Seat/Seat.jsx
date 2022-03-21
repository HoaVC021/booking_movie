import React from 'react';
import chair_booked from '../../../../../assets/images/chair.png';
import chair from '../../../../../assets/images/chair_booked.png';
import chairbooking from '../../../../../assets/images/chair_booking.png';
import { style } from './style';
function Seat({ status, number, isbooking }) {
  const { seatbooking, seat, seatbooked, seat_number } = style;
  return (
    <>
      {status ? (
        <div style={{ ...seatbooked, backgroundImage: `url(${chair_booked})` }}>
          <div style={{ ...seat_number }}>{number}</div>
        </div>
      ) : isbooking ? (
        <div
          style={{ ...seatbooking, backgroundImage: `url(${chairbooking})` }}
        >
          <div style={{ ...seat_number }}>{number}</div>
        </div>
      ) : (
        <div style={{ ...seat, backgroundImage: `url(${chair})` }}>
          <div style={{ ...seat_number }}>{number}</div>
        </div>
      )}
    </>
  );
}

export default Seat;
