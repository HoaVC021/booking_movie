import React from 'react';
import Avatar from '@mui/material/Avatar';

import banner from '../../../../../assets/images/background.jpg'
import avatar from '../../../../../assets/images/avatar.jpg'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useStyles } from '../../style';

export default function Banner() {
    const classes = useStyles();
    const profile = useSelector(state => state.profile.profile)
    console.log(profile);
    return (
        <>
            <div className={classes.bannerBg} style={{
                backgroundImage: `url(${"https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_960_720.jpg"})`,
            }}>
                <div  alt="Remy Sharp1" src={banner} className={classes.avatar} >
                    <Avatar alt="Remy Sharp" src={avatar} style={{
                        width: '160px',
                        height: '160px',
                        marginRight: '20px'
                    }} />
                    <div style={{ lineHeight: '1' }}>
                        <Typography variant='h4' fontFamily={'fantasy'}>{profile.hoTen}</Typography>
                        <Typography variant='p'>{profile.taiKhoan}</Typography>
                    </div>
                </div>
            </div>
        </>
    );
}
