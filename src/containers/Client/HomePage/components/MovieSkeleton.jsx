import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Grid, Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';

MovieSkeleton.propTypes = {
  length: PropTypes.number,
};
MovieSkeleton.defaultProps = {
  length: 8,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

function MovieSkeleton({ length }) {
  const classes = useStyles();
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Box padding={1} className={classes.root}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
                sx={{ bgcolor: 'grey.700' }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MovieSkeleton;
