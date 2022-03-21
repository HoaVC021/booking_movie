import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

Movie.propTypes = {
  movie: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: '#6573c3',
    },
  },
  card: {
    flexGrow: '0',
    height: '350px',
    minHeight: '350px',
    background: '#fff',
    border: '2px solid #fff',
    boxShadow: '0px 4px 7px rgba(0,0,0,.5)',
    cursor: 'pointer',
    transition: 'all .5s cubic-bezier(.8,.5,.2,1.4)',
    overflow: 'hidden',
    position: 'relative',
    '&:hover': {
      transition: 'all .5s cubic-bezier(.8,.5,.2,1.4)',
      boxShadow: '0px 2px 3px rgba(0,0,0,.3)',
      transform: 'scale(.97)',
      '& $description': {
        left: '0px',
        transition: 'all .7s ease-in-out',
        clipPath: 'circle(75%)',
      },
      '& $img': {
        transition: 'all .5s cubic-bezier(.8,.5,.2,1.4)',
        transform: 'scale(1.6) rotate(20deg)',
        filter: 'blur(3px)',
      },
    },
  },
  img: {
    width: '100%',
    height: '100%',
    transition: 'all .5s cubic-bezier(.8,.5,.2,1.4)',
  },
  description: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    backgroundColor: 'rgba(255,255,255,.7)',
    width: '100%',
    height: '100%',
    transition: 'all .7s ease-in-out',
    padding: '20px',
    boxSizing: 'border-box',
    clipPath: 'circle(0% at 100% 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    lineHeight: '24px',
    textAlign: 'center',
  },
}));

function Movie({ movie }) {
  const classes = useStyles();
  let navigate = useNavigate();
  const handleClick = (movie) => {
    console.log(movie);
    //navigate to detail page
    // history.push(`/detail/${movie.id}`);
    navigate(`/detail/${movie.maPhim}`);
  };

  const thumbnailUrl = movie.hinhAnh
    ? movie.hinhAnh
    : 'https://blog.holosophic.org/wp-content/uploads/2018/05/Countries-page-image-placeholder-800x500.jpg';

  return (
    <Box
      padding={2}
      className={classes.root}
      xs={12}
      sm={6}
      md={4}
      lg={3}
      onClick={() => {
        handleClick(movie);
      }}
    >
      <Card className={classes.wrapper}>
        <CardActionArea className={classes.card}>
          <CardMedia
            component="img"
            height="300"
            image={thumbnailUrl}
            alt="movie"
            className={classes.img}
          />
          <CardContent className={classes.description}>
            <Typography
              component="div"
              mb={3}
              variant="h5"
              className={classes.title}
            >
              {movie.tenPhim}
            </Typography>
            <Typography component="div" variant="h6">
              Raiting
            </Typography>

            <Rating
              name="half-rating-read"
              defaultValue={(movie.danhGia * 1) / 2}
              precision={0.25}
              readOnly
            />
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

export default Movie;
