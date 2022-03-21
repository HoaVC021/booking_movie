import { Box } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CircularIndeterminate from '../../../components/Loading/Loading';
import Banner from './components/Banner/Banner';
import BannerDetail from './components/BannerDetail/BannerDetail';
import Content from './components/Content/Content';
import { getFilm, getInfoShowTimes } from './movieDetailSlice';
import { useStyles } from './style';
import './style.css';

export default function DetailMovie() {

    const dispatch = useDispatch();
    const params = useParams()
    const { id } = params

    const loading = useSelector((state) => state.movieDetail.loading)
    const classes = useStyles();
    useEffect(() => {
        window.scrollTo(0, 0)
        const getTest = async () => {
            console.log(id);
            try {
                const actionGetFilm = await dispatch(getFilm(id));
                const actionShowTime = await dispatch(getInfoShowTimes(id));
                unwrapResult(actionGetFilm);
                unwrapResult(actionShowTime);
            } catch (error) {
                console.log(error);
                return alert(error.message)
            }
        }
        getTest()
        return () => { };
        // eslint-disable-next-line
    }, []);
    return (
        <>
            {loading ? <CircularIndeterminate /> : <Box className={classes.detailMovie}>
                <Banner />
                <BannerDetail />
                <Content />
            </Box>}
        </>
    );
}
