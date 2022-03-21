import FavoriteIcon from '@mui/icons-material/Favorite';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box, Button, Container } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Review from './Review';
import { useStyles } from './style';


export default function BannerDetail() {

    const movie = useSelector(state => state.movieDetail.movie)
    const listEmoij = [
        {
            icon: FavoriteIcon,
            color: '#ff5959',
            rating: movie.danhGia,
            title: 'Users Rating',
        },
        {
            icon: HowToRegIcon,
            color: '#6d6ec7',
            rating: '88%',
            title: 'Audience Score',
        },
        {
            icon: ThumbUpIcon,
            color: '#bcff00',
            rating: '88%',
            title: 'Tomatometer',
        },
    ];
    const handleBooking = () => {
        window.scrollTo({
            top: 600,
            behavior: "smooth"
        });
    }
    const classes = useStyles();
    return (
        <Box className={classes.bannerDetail}>
            <Container>
                <Box className={classes.reviewBanner}>
                    <Box className={classes.empty}></Box>
                    {listEmoij.map((item, index) => (
                        <Review item={item} key={index} />
                    ))}
                    <Button
                        className={classes.booking}
                        style={{ color: 'white', padding: '5px 10px' }}
                        onClick={handleBooking}
                    >
                        Booking
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
