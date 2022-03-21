import React from 'react';

import { Box } from '@mui/system';

import { useStyles } from './style';
import { Typography } from '@mui/material';

export default function Review({ item }) {
    const classes = useStyles();
    return (
        <Box
            className={classes.reviewItem}
        >
            <Box className={classes.itemTop}>
                <Typography variant="i">
                    <item.icon style={{ fill: item.color, fontSize: 30 }} />
                </Typography>
                <Box>{item.rating}</Box>
            </Box>
            <Typography variant="span">{item.title}</Typography>
        </Box>
    );
}
