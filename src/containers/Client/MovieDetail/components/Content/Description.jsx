import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import React from 'react';

import { useStyles } from './style';
import { useSelector } from 'react-redux';

export default function Description() {

    const des = useSelector(state => state.movieDetail.movie.moTa)
    const classes = useStyles();
    return (
        <Box className={classes.desc}>
            <Typography variant="h4" style={{ color: 'cyan' }}>SEASON</Typography>
            <Typography variant="p" style={{ color: 'white' }}>{des}
            </Typography>
        </Box>
    );
}
