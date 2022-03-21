import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import Pay from './components/Pay/Pay';
import ShowCinema from './components/ShowCinema/ShowCinema';
import Description from './Description';
import { useStyles } from './style';


export default function Content() {
    const infoShowtimes = useSelector(state => state.movieDetail.infoShowtimes)
    const classes = useStyles();
    return (
        <Box style={{ marginTop: '80px' }}>
            {infoShowtimes.length > 0 ? (
                <Container style={{ padding: '0' }}>
                    <Box className={classes.contentContainer}>
                        <Box className={classes.contentItem}>
                            <Description />
                            <ShowCinema />
                        </Box>
                        <Box className={classes.pay}>
                            <Pay />
                        </Box>
                    </Box>
                </Container>
            ) : (
                <div></div>
            )}
        </Box>
    );
}
