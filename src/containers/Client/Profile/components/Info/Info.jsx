import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';
import { useStyles } from '../../style';
import ProfileModal from '../ProfileModal/ProfileModal';
import Item from './Item';

export default function Info() {
  const profile = useSelector((state) => state.profile.profile);
  const isloading = useSelector((state) => state.profile.loading);
  const [isVisible, setVisible] = useState(false);
  const classes = useStyles();
  const booking = {
    zIndex: 2,
    backgroundImage:
      '-webkit-linear-gradient(169deg,#5560ff 17%,#aa52a1 63%,#ff4343)',
    height: '50%',
    minHeight: '40px',
    minWidth: '90px',
  };
  const renderSkeleton = () => {
    return <Skeleton style={{ heigh: '100px' }} active />;
  };
  return (
    <div className>
      <div className={classes.info}>
        <Typography variant="h4" fontFamily={'monospace'} fontWeight={'bold'}>
          Profile Infomation
        </Typography>
        <hr />
        <Box sx={{ marginBottom: '1rem' }}>
          {isloading ? (
            renderSkeleton()
          ) : (
            <>
              <Item lable="Full Name:" value={profile.hoTen} />
              <Item lable="Email:" value={profile.email} />
              <Item lable="Phone Number:" value={profile.soDT} />
              <Item lable="Group:" value={profile.maNhom} />
              <Button
                onClick={() => setVisible(true)}
                style={{ ...booking, color: 'white', padding: '5px 10px', marginTop: "10px" }}
              >
                Edit Profile
              </Button>

            </>
          )}
        </Box>
        <ProfileModal
          visible={isVisible}
          onVisible={setVisible}
          record={profile}
        />
      </div>
    </div>
  );
}
