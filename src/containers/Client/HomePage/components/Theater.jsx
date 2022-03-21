import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Box
} from '@mui/system';
import React from 'react';

Theater.propTypes = {};
const useStyles = makeStyles((theme) => ({
  rootTheater: {
    margin: '10px 0px 80px 0px',
    border: '1px solid #fff',
    borderRadius: '10px',
    height: '575px',
    '*::-webkit-scrollbar': {
      display: 'flex',
    },
  },
  theaters: {
    width: '10%',
    borderRight: '1px solid #fff',
    height: '570px',
    overflow: 'scroll',
    '*::-webkit-scrollbar': {
      display: 'flex',
    },
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  theater: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  imgTheater: {
    padding: '15px',
    // borderBottom: '2px solid grey',
    width: '90px',
    transition: 'transform .2s',
    '&:hover ': {
      transform: 'scale(1.1)',
    },
  },
  branchs: {
    width: '40%',
    borderRight: '1px solid #fff',
    color: '#fff',
    height: '570px',
    overflow: 'scroll',
  },
  branchItem: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    marginBottom: '15px',
    borderBottom: '2px solid grey',
    padding: '10px 5px',
  },

  movie: {
    width: '50%',
    color: '#fff',
    height: '570px',
    overflow: 'scroll',
  },
  showMovie: {
    display: 'flex',
    flexDirection: 'row',
    padding: '15px 5px',
    borderBottom: '1px solid #fff',
  },
  img: {
    width: '80px',
    height: '80px',
    margin: '0px 20px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
  },
  // showTime:{
  //     display:'flex',
  //     flexDirection:' row',
  //     flexWrap: 'wrap',
  //     borderBottom:'1px solid #fff'
  // },
  // showTimeItem:{
  //   margin:'7px 15px',
  //   border :'1px solid #fff',
  //   padding:'10px',
  //   borderRadius:'10px'
  // }
}));

function Theater({
  theaters,
  branchs,
  movieBranch,
  handleTheater,
  handleBranch,
}) {
  const classes = useStyles();
  return (
    <Box className={classes.rootTheater}>
      <Grid container spacing={0}>
        <Grid item className={classes.theaters}>
          {theaters.map((item) => (
            <Box
              key={item.maHeThongRap}
              width="100%"
              className={classes.theater}
              onClick={() => handleTheater(item)}
            >
              <img
                key={item.maHeThongRap}
                src={item.logo}
                alt="logo"
                width="100"
                className={classes.imgTheater}
              />
            </Box>
          ))}
        </Grid>
        <Grid item className={classes.branchs}>
          {branchs.map((item) => (
            <Box
              key={item.maCumRap}
              className={classes.branchItem}
              onClick={() => handleBranch(item)}
            >
              <Typography variant="h6" color="#fff">
                {item.tenCumRap}
              </Typography>
              <Typography variant="h7" color="#fff">
                Địa chỉ :{item.diaChi}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item className={classes.movie}>
          {movieBranch.map((item) => (
            <Box key={item.maPhim}>
              <Box>
                <Box className={classes.showMovie}>
                  <img src={item.hinhAnh} alt="movie" className={classes.img} />
                  <Typography variant="h5" className={classes.title}>
                    {item.tenPhim}
                  </Typography>
                </Box>
                {/* <Box className={classes.showTime} >
                    {item.lstLichChieuTheoPhim.map((showTime) => (
                    <Box key={showTime.maLichChieu} className={classes.showTimeItem}>
                        <Typography>{showTime.tenRap}</Typography>
                        <Typography>{showTime.ngayChieuGioChieu}</Typography>
                    </Box>
                    ))}
                  </Box> */}
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Theater;
