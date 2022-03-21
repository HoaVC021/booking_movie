import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListTime, getShowtimes, getTheater, getTheaters } from '../../../../movieDetailSlice';
import { useStyles } from '../../style';
import ShowDetailCinema from '../ShowDetailCinema/ShowDetailCinema';
import FormSelect from './FormSelect';


export default function ShowCinema() {

    const dispatch = useDispatch()

    const listShowTime = useSelector(state => state.movieDetail.infoShowtimes)
    const cumRapChieu = useSelector(state => state.movieDetail.cumRapChieu)
    // const listGioChieu = useSelector(state => state.movieDetail.listGioChieu)
    const lichChieuPhim = useSelector(state => state.movieDetail.lichChieuPhim)
    const classes = useStyles();
    useEffect(() => {
        dispatch(getShowtimes([]))
        dispatch(getTheaters([]))
        dispatch(getTheater(''))
        // eslint-disable-next-line
    }, [])
    const handleOnChange = (value) => {
        const getCumRapChieu = listShowTime.find(
            (item) => item.maHeThongRap === value
        );
        if (getCumRapChieu && getCumRapChieu.cumRapChieu.length > 0) {
            const timeArray = {};
            //get ngayChieu
            getCumRapChieu.cumRapChieu.forEach((cumRap) => {
                cumRap.lichChieuPhim.forEach((item) => {
                    if (
                        typeof timeArray[item.ngayChieuGioChieu.slice(0, 10)] === 'object'
                    ) {
                        timeArray[item.ngayChieuGioChieu.slice(0, 10)].push({
                            maCumRap: cumRap.maCumRap,
                            gioChieu: item.ngayChieuGioChieu.slice(11, 16),
                            maLichChieu: item.maLichChieu,
                        });
                    } else
                        timeArray[item.ngayChieuGioChieu.slice(0, 10)] = [
                            {
                                maCumRap: cumRap.maCumRap,
                                gioChieu: item.ngayChieuGioChieu.slice(11, 16),
                                maLichChieu: item.maLichChieu,
                            },
                        ];
                });
            });
            dispatch(getShowtimes(timeArray))
            dispatch(getTheaters(getCumRapChieu.cumRapChieu))
        }
        dispatch(getListTime(lichChieuPhim[value]));
    };

    return (
        <Box>
            <Grid container spacing={2} className={classes.boxShow}>
                <Grid item xs={6}>
                    <FormSelect
                        listShowTime={listShowTime}
                        onHanleChange={handleOnChange}
                        inputLable="Theater"
                    />
                </Grid>
                <Grid item xs={6}>
                    {cumRapChieu.length > 0 && (
                        <FormSelect
                            lichChieuPhim={lichChieuPhim}
                            onHanleChange={handleOnChange}
                            inputLable="Date"
                        />
                    )}
                </Grid>
            </Grid>
            {
                <ShowDetailCinema />
            }
        </Box>
    );
}
