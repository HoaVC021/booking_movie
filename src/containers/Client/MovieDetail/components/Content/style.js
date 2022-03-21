import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles((theme) => ({
  contentContainer: {
    display: 'flex',
    '@media only screen and (max-width: 650px)': {
      display: 'block',
      width: '90vw',
      margin: 'auto',
    },
  },
  contentItem: {
    width: '75%',
    marginRight: '2rem',
    '@media only screen and (max-width: 650px)': {
      display: 'block',
      width: '100%',
      margin: 'auto',
    },
  },
  //desciption
  desc: { margin: '0px 10px 50px' },
  //showCinema
  boxShow: {
    borderRadius: '5px',
    marginBottom: '50px',
  },
  selsectItem: {
    '&:hover': {
      '&& fieldset': {
        border: '1px solid #24708e',
      },
    },
  },
  /* Show Detail */
  // showDetail: {
  //   marginBottom: '20px',
  //   display: 'flex',
  //   borderRadius: '5px',
  //   border: '1px solid #24708e',
  // },
  theaters: {
    width: '45%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  theatersDetail: {
    display: 'flex',
    alignItems: 'center',
  },
  timeMovies: {
    flex: '1',
    height: '80px',
    display: 'flex',
    overflowY: 'auto',
    // marginRight: '25px',
    '&::-webkit-scrollbar': {
      height: '3px',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 1px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      width: '5px',
      backgroundColor: 'slategrey',
      outline: '2px solid slategrey',
      cursor: 'pointer',
    },
  },
  //show Time
  timeline: {
    margin: '0 5px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTimeline: {
    width: '75px',
    height: '40px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  //Pay
  pay: {
    width: '25%',
    '@media only screen and (max-width: 650px)': {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      margin: 'auto',
    },
  },
  payBox: {},
  payItem: {
    height: 'auto',
    padding: '10px',
    margin: '10px',
    borderRadius: '10px',
    border: '1px dashed green',
    backgroundColor: '#d4c4c42e',
  },
  payIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    margin: '10px 0 10px',
  },
}));
