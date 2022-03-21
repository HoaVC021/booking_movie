import React from 'react';

import { Container, Typography } from '@mui/material';
import { useStyles } from './style';
import { Box } from '@mui/system';

import MovieTrailer from './MovieTrailer';
import { useSelector } from 'react-redux';

export default function Banner() {

    const movie = useSelector(state => state.movieDetail.movie)
    const classes = useStyles();
    return (movie.maPhim) ? (
        <Box
            className={classes.banner}
            style={{ backgroundImage: `url(${movie.hinhAnh})` }}
        >
            <Container style={{ position: 'relative' }}>
                <Box className={classes.bannerItem}>
                    <Box pr={3} className={classes.itemLeft}>
                        <img
                            className={classes.img}
                            src={movie.hinhAnh}
                            alt={movie.biDanh}
                        />
                        <Box className={classes.trailer} sx={{ background: '#09085252' }}>
                            <MovieTrailer
                                urlTrailer={movie.trailer}
                                style={{ zIndex: '10' }}
                            />
                        </Box>
                    </Box>
                    <Box className={classes.itemRight}>
                        <Typography
                            variant="h3"
                            color="white"
                            sx={{ fontWeight: '700', paddingBottom: '10px' }}
                        >
                            {movie.tenPhim}
                        </Typography>
                        <Box className={classes.desMovie} sx={{ marginBottom: '20px' }}>
                            <Typography variant="span" color="#00ffd0">
                                {movie.moTa}
                            </Typography>
                        </Box>
                        <Box className="type-movie" sx={{ marginBottom: '20px' }}>
                            <Typography
                                variant="span"
                                sx={{
                                    padding: '5px 20px',
                                    border: '1px solid #777',
                                    borderRadius: '20px',
                                    color: 'white'
                                }}
                            >
                                2D | Digital
                            </Typography>
                        </Box>
                        <Box className="date-duration" sx={{ color: 'white' }}>
                            Release Date: {movie.ngayKhoiChieu.toString().slice(0, 10)}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    ) : (
        <div>Not found</div>
    );
}
