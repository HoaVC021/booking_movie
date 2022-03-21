import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgTime from '../../../../../../../assets/images/pg-time.png';
import { useStyles } from '../../style';


export default function ShowTimeLine({ time }) {
    const history = useNavigate()
    const classes = useStyles();

    const handleOnBooking = (idMLC) => {
        history(`/ticketroom/${idMLC}`);
    }

    return (
        <Box className={classes.timeline}>
            {/* <Link to={`${time.maLichChieu}`}> */}
            <time onClick={() => handleOnBooking(time.maLichChieu)}
                className={classes.itemTimeline}
                style={{
                    backgroundImage: `url(${bgTime})`,
                }}
            >
                {time.gioChieu || ''}
            </time>
            {/* </Link> */}
        </Box>
    );
}
