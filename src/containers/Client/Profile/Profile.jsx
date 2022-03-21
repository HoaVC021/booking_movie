import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BookingHistory from './components/BookingHistory/BookingHistory';
import Info from './components/Info/Info';
import { getProfile } from './profileSlice';
import { useStyles } from './style';

export default function Profile() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile.profile)
    const params = useParams()
    const { taiKhoan } = params
    useEffect(() => {
        try {
            dispatch(getProfile({ taiKhoan }))
        } catch (error) {
            console.log(error);
        }
    }, [])
    return (
        <div className={classes.profile}>
            {/* <div className={classes.banner}>
                <Banner />
            </div> */}
            {/* <hr style={{ margin: '0', padding: '0' }} /> */}
            <div className={classes.section}>
                <Info />
                <BookingHistory />
            </div>
        </div>
    );
}
