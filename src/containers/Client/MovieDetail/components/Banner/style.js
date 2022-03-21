import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  banner: {
    width: '100%',
    height: '400px',
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    backgroundRepeat: 'no-repeat',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 70,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        '-webkit-linear-gradient(180deg,rgba(0,18,50,.134891),#001232 90%)',
      height: '400px',
    },
    '@media only screen and (max-width: 650px)': {
      width: '100vw',
      backgroundImage: 'none',
    },
  },
  bannerItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: '150px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1,
  },
  itemLeft: {
    width: '22%',
    height: '400px',
    position: 'relative',
    marginRight: '2rem',
    '@media only screen and (max-width: 650px)': {
      display: 'none',
    },
  },
  img: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    position: 'absolute',
  },
  trailer: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemRight: {
    flex: 1,
    '@media only screen and (max-width: 650px)': {
      width: '90vw',
      margin: 'auto',
      flex: 'none',
    },
  },
  desMovie: {
    '@media only screen and (max-width: 750px)': {
      display: 'none',
    },
  },
  reactPlayer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: ' translate(-50%, -50%)',
    margin: 'auto',
    width: '80vw',
    height: '700px',
    '@media only screen and (max-width: 1250px)': {
      width: '80vw',
      height: '600px',
    },
    '@media only screen and (max-width: 1000px)': {
      width: '80vw',
      height: '500px',
    },
    '@media only screen and (max-width: 650px)': {
      width: '80vw',
      height: '400px',
    },
    '@media only screen and (max-width: 400px)': {
      width: '90vw',
      height: '300px',
    },
  },
});
