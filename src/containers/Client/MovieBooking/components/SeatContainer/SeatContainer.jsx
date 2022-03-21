import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Seat from '../Seat/Seat';
import './style.css';
function SeatContainer({ getBookSeats, seatbook }) {
  const bookInfo = useSelector((state) => state.movieBooking.bookList);

  const [seats, setSeats] = useState([]);
  const seatref = useRef([]);
  useEffect(() => {
    console.log('bookInfo', bookInfo);
    setSeats(bookInfo.danhSachGhe);
    const chairList = bookInfo.danhSachGhe ? bookInfo.danhSachGhe : [];
    const arrformat = formatSeatName(chairList, 16);
    setSeats([...arrformat]);
  }, [bookInfo]);

  const handleBook = (seat) => {
    console.log('adas ne', seat.daDat);
    if (!seat.daDat) {
      let seatarray = [...seats];
      let updateseat;
      if (!seat?.dangChon) {
        updateseat = { ...seat, dangChon: true };
        seatref.current = [...seatref.current, seat];
      } else {
        updateseat = { ...seat, dangChon: false };
        seatref.current = [
          ...seatref.current.filter(
            (curent) => curent.alphaGhe !== seat.alphaGhe
          ),
        ];
      }
      getBookSeats(seatref.current);
      updateSeats(seatarray, updateseat, seat.maGhe, seat.rowIndex);
    }

    // console.log("seatref.current",seatref.current);
  };
  function updateSeats(array, newobj, key, row) {
    let newarray = [...array];
    const objIndex = newarray[row].findIndex((obj) => obj.maGhe == key);
    newarray[row][objIndex] = { ...newobj };
    setSeats([...array]);
  }
  const formatSeatName = (seats, size) => {
    const rowKey = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let arrayformated = chunkArray(seats, size);
    for (let i = 0; i < arrayformated.length; i++) {
      let currentArray = arrayformated[i];
      currentArray.forEach((seat, index) => {
        const objIndex = currentArray.findIndex(
          (obj) => obj.maGhe == seat.maGhe
        );
        currentArray[objIndex] = {
          ...seat,
          alphaGhe: `${rowKey[i]}${index + 1}`,
          rowIndex: i,
        };
      });
    }
    return arrayformated;
  };
  function chunkArray(myArray, chunk_size) {
    var index = 0;
    var arrayLength = myArray.length ? myArray.length : 0;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }
    return tempArray;
  }
  const renderSeat = () =>
    seats.map((seat, index) => (
      <div key={index} className="row">
        {seat.map((se, index) => (
          <div
            className={`${index === 3 || index === 11 ? 'lastcolumn' : ''}`}
            key={se.maGhe}
            onClick={() => handleBook(se)}
          >
            <Seat
              status={se.daDat}
              isbooking={se?.dangChon}
              number={se?.alphaGhe}
            />
          </div>
        ))}
      </div>
    ));
  return (
    <div className="container">
      <div className="seat_container">{renderSeat()}</div>
    </div>
  );
}

export default SeatContainer;
