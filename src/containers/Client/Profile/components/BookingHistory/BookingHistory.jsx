import { Card, Empty, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardInfo from '../CardInfo/CardInfo';
import './bookinghistory.css';
function BookingHistory() {
  const [histories, sethistoriese] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  let profile = useSelector((state) => state.profile.profile);
  let isloading = useSelector((state) => state.profile.loading);
  useEffect(() => {
    if (profile.thongTinDatVe) {
      sethistoriese(profile.thongTinDatVe);
      setisLoading(isloading);
    }
  }, [profile]);

  const renderCard = () => {
    if (histories) {
      return histories.map((item) => (
        <CardInfo
          key={item.ngayDat}
          movie={item.tenPhim}
          date={item.ngayDat}
          seatList={item.danhSachGhe}
        />
      ));
    }
    return '';
  };
  const renderSkeleton = () => {
    return <Skeleton active />;
  };
  return (
    <div className="bookhistory">
      <Card title="Booking History">
        {isloading ? (
          renderSkeleton()
        ) : histories.length > 0 ? (
          renderCard()
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>
    </div>
  );
}

export default BookingHistory;
