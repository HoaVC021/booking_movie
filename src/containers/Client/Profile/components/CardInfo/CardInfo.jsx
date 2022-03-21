import { Card, Drawer } from 'antd';
import React, { useState } from 'react';

function CardInfo({ movie, date, seatList }) {
  const gridStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: '10px',
    marginBottom: '10px'
  };
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div>
      <Card.Grid
        onClick={() => showDrawer()}
        type="inner"
        style={gridStyle}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{movie} </div>
            <div>{`${date.slice(0, 10)} [${date.slice(11, 16)}]`}</div>
          </div>
          <div style={{ color: 'tomato' }}>{seatList.length} Ghế</div>
        </div>
      </Card.Grid>
      <Drawer
        title="Danh sách ghế"
        placement="right"
        onClose={onClose}
        visible={visible}
        style={{ zIndex: '99999999999999' }}
      >
        {seatList.map((seat) => (
          <Card
            type="inner"
            title={`Ghế ${seat.tenGhe}`}
            style={{ overFlow: 'hiden', marginBottom: '10px' }}
          >
            <div>Hệ thống rạp {seat.tenHeThongRap}</div>
            <div>{seat.tenCumRap}</div>
          </Card>
        ))}
      </Drawer>
    </div>
  );
}

export default CardInfo;
