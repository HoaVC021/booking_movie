import { Box, Typography } from '@mui/material';
import React from 'react';

import { useStyles } from '../../style';

export default function PayItem({ item }) {
    const classes = useStyles();
    return (
        <Box className={classes.payItem}>
            <img src={item.icon} alt="picturekkak" className={classes.payIcon} />
            <Typography variant="h6" sx={{ mb: 1 }}>
                {item.title}
            </Typography>
            <Typography variant="i">{item.des}</Typography>
        </Box>
    );
}
