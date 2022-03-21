import { Box, Button, Container, Grid, Pagination, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from './components/Banner';
import MovieList from './components/MovieList';
import MovieSkeleton from './components/MovieSkeleton';
import Theater from './components/Theater';
import {
  getBanners,
  getBranchs,
  getMovies,
  getTheaters,
} from './homePageSlice';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      display: 'none',
    },
  },
  root: {
    backgroundColor: '#1a2129',
  },
  listMovie: {
    margin: '30px 0px 20px 0px',
    color: '#fff',
    width: '100%',
  },
  pagination: {
    margin: '30px 0px',
  },
  ul: {
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaginationItem-root': {
      color: '#fff',
    },
  },
  moveTop: {
    background: '#fff',
    bottom: '19px',
    color: '#333',
    cursor: 'pointer',
    fontSize: '18px',
    height: '45px',
    lineHeight: '44px',
    overflow: 'hidden',
    position: 'fixed',
    right: '3%',
    textAlign: 'center',
    width: '45px',
    zIndex: '999',
  },
}));

function Homepage(props) {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);
  const [theaters, setTheaters] = useState([]);
  const [theaterItem, setTheaterItem] = useState('BHDStar');
  const [branchs, setBranchs] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    count: 8,
  });
  const [totalPages, setTotalPages] = useState(8);
  const [movieBranch, setMovieBranch] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.home.loading);
  const movieList = useSelector((state) => state.home.movieList);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    const get = async () => {
      await unwrapResult(dispatch(getBanners()));
      const getMovieList = await dispatch(getMovies(pagination));
      setTotalPages(getMovieList.payload.totalPages);
    };
    get();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      try {
        //get Theater data
        const getTheaterData = await dispatch(getTheaters());
        const theatersResult = unwrapResult(getTheaterData);
        setTheaters(theatersResult);

        //get Branch data
        const getBranchData = await dispatch(getBranchs(theaterItem));
        const branchsResult = unwrapResult(getBranchData);
        setBranchs(branchsResult[0].lstCumRap);
        const firstMovieList = branchsResult[0].lstCumRap[0].danhSachPhim;
        setMovieBranch(firstMovieList);
      } catch (error) {
        alert('Failed to fetch data: ', error);
      }
    })();
  }, [theaterItem, dispatch]);

  const handlePageChange = async (e, page) => {
    await dispatch(
      getMovies({
        ...pagination,
        currentPage: page,
      })
    );
    setPagination({
      ...pagination,
      currentPage: page,
    });
  };
  const handleTheater = (item) => {
    setTheaterItem(item.maHeThongRap);
  };
  const handleBranch = (item) => {
    const filterBranch = branchs.filter(
      (branch) => branch.maCumRap === item.maCumRap
    );
    setMovieBranch(filterBranch[0].danhSachPhim);
  };
  return (
    <Box className={classes.root} pt={4}>
      {isVisible && (
        <Box onClick={scrollToTop}>
          <Button className={classes.moveTop} variant="contained">
            <ArrowUpwardIcon />
          </Button>
        </Box>
      )}
      <Container>
        <Paper elevation={1}>
          <Banner />
        </Paper>
        <Grid container>
          <Box p={1} className={classes.listMovie}>
            <Typography gutterBottom variant="h2" component="div">
              Movies
            </Typography>
            {loading ? <MovieSkeleton /> : <MovieList data={movieList} />}
            <Box className={classes.pagination}>
              <Pagination
                classes={{ ul: classes.ul }}
                color="primary"
                onChange={handlePageChange}
                page={pagination.currentPage}
                count={totalPages}
              />
            </Box>
          </Box>
          <Box width="100%">
            <Theater
              theaters={theaters}
              branchs={branchs}
              movieBranch={movieBranch}
              handleBranch={handleBranch}
              handleTheater={handleTheater}
            />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default Homepage;
