import React from 'react';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useStyles } from '../../style';
import ShowTimeLine from './ShowTimeLine';

export default function ShowDetailItem({ rapChieu, listTime }) {
    const classes = useStyles();
    return (
        <Box className="showdetail">
            <Box className={classes.theaters}>
                <Box className={classes.theatersDetail}>
                    <FavoriteIcon
                        className="favorite-icon"
                        sx={{ marginRight: '10px' }}
                    />
                    <Typography>{rapChieu}</Typography>
                </Box>
                <LocationOnIcon className="location-icon" />
            </Box>
            <Box className={classes.timeMovies}>
                {(listTime && listTime.length) > 0 &&
                    listTime.map((time) => (
                        <ShowTimeLine time={time} key={time.maLichChieu} />
                    ))}
            </Box>
        </Box>
    );
}
