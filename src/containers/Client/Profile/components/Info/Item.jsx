import { Typography } from '@mui/material';
import React from 'react';

export default function Item({ lable, value }) {
    return (
        <div>
            <Typography
                variant='span'
                fontFamily={'monospace'}
                fontWeight={'bold'}
                fontSize={'16px'}
            >
                {lable}
            </Typography>
            <Typography
                variant='span'
                fontFamily={'monospace'}
                sx={{ color: 'black' }}
            > {value}
            </Typography>
        </div>
    );
}
