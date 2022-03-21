import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import banner1 from '../../../../assets/images/bn1.png';
import banner2 from '../../../../assets/images/bn2.png';
import banner3 from '../../../../assets/images/bn3.png';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '70vh',
  },
  img: {
    width: '100%',
    height: '70vh',
    objectFit: 'cover',
  },
}));

const banners = [banner1, banner2, banner3];

function Banner() {
  // const banners = useSelector((state) => state.home.banners);
  const classes = useStyles();
  return (
    <Carousel
      fullHeightHover={false}
      navButtonsProps={{
        // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
        style: {
          backgroundColor: 'cornflowerblue',
          borderRadius: 50,
          margin: '0px 10px',
        },
      }}
      indicatorContainerProps={{
        style: {
          marginTop: '5px', // 5
        },
      }}
      className={classes.root}
    >
      {banners.map((item, index) => (
        <Paper key={index}>
          <img className={classes.img} src={item} alt={`banner ${index}`} />
        </Paper>
      ))}
    </Carousel>
  );
}

export default Banner;
