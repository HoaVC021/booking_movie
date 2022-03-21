import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {},
  profile: {
    paddingTop: '30px',
    width: '100%',
    minHeight: '700px',
    // background: '#c494ff',
    backgroundImage:
      'url(https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_960_720.jpg)',
  },
  banner: {
    width: '100%',
    margin: 'auto',
    // height: '550px',
    background: '#eedeff47',
  },
  bannerBg: {
    width: '100%',
    margin: 'auto',
    height: '400px',
    backgroundSize: 'cover',
    position: 'relative',
  },
  avatar: {
    position: 'absolute',
    height: '160px',
    left: '5%',
    bottom: '-125px',
    display: 'flex',
    alignItems: 'center',
  },
  section: {
    width: '70%',
    margin: 'auto',
    marginTop: '2rem',
    height: 'auto',
    display: 'flex',
    paddingBottom: '3rem',
    '@media (max-width: 800px)': {
      display: 'block',
    },
  },
  info: {
    height: 'auto',
    padding: '20px',
    marginBottom: '5rem',
    marginRight: '3rem',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 1px 2px var(--shadow-2)',
    '@media (max-width: 800px)': {
      width: '90%',
      margin: 'auto',
      marginBottom: '2rem',
    },
  },
}));
