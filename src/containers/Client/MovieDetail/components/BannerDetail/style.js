import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  bannerDetail: {
    position: 'relative',
    backgroundColor: '#032055',
    padding: '30px 0',
    borderTop: '1px solid #17305f',
    borderBottom: '1px solid #17305f',
    color: 'white',
  },
  reviewBanner: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '@media only screen and (max-width: 650px)': {
      justifyContent: 'center',
    },
  },
  empty: {
    flex: 1,
    '@media only screen and (max-width: 650px)': {
      display: 'none',
      flex: 'none',
    },
  },
  reviewItem: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media only screen and (max-width: 650px)': {
      width: '25%',
    },
    '@media only screen and (max-width: 450px)': {
      display: 'none',
    },
  },
  booking: {
    zIndex: 2,
    backgroundImage:
      '-webkit-linear-gradient(169deg,#5560ff 17%,#aa52a1 63%,#ff4343)',
    height: 'auto',
  },
  itemTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '50%',
    margin: 'auto',
  },
}));
