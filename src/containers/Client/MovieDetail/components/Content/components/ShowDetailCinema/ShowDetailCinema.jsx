import React from 'react';
import { Box } from '@mui/material';

import ShowDetailItem from './ShowDetailItem';
import { useSelector } from 'react-redux';

export default function ShowDetailCinema() {
    const cumRapChieu = useSelector(state => state.movieDetail.cumRapChieu)
    const listGioChieu = useSelector(state => state.movieDetail.listGioChieu)
    const listTime = {};
    if (cumRapChieu && listGioChieu) {
        for (const rapChieu of cumRapChieu) {
            const arr = [];
            listGioChieu.forEach((item) => {
                if (rapChieu.maCumRap === item.maCumRap) {
                    arr.push(item);
                }
            });
            listTime[rapChieu.tenCumRap] = arr;
        }
    }
    return (
        <Box>
            {cumRapChieu.length > 0 &&
                cumRapChieu.map((rapChieu) => (
                    <ShowDetailItem
                        key={rapChieu.maCumRap}
                        rapChieu={rapChieu.tenCumRap}
                        listTime={listTime[rapChieu.tenCumRap]}
                    />
                ))}
        </Box>
    );
}
