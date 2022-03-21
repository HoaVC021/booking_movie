import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import Movie from './Movie';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

function MovieList({ data = [] }) {
  const classes = useStyles();
  return (
    <Box>
      <Grid container className={classes.root}>
        {data.map((movie) => (
          <Grid item key={movie.maPhim} xs={12} sm={6} md={4} lg={3}>
            <Movie movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MovieList;
