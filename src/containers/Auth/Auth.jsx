import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Login from './login';
import Register from './register';
// import AlertTest from '../AlertTest/AlertTest';
// import Alert from '../Alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import './auth.css';
// import axios from 'axios';
// import SignupPage from '../SignupPage';

const SignInOutContainer = () => {
  const errorLogin = useSelector((state) => state.auth.errorlogin);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const paperStyle = { width: 400, margin: '20px auto' };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography component={'div'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div className="auth__container">
      <Paper
        style={{ borderRadius: '15px' }}
        className="login__form"
        elevation={20}
      >
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          variant="fullWidth"
        >
          <Tab label="Log In" />

          <Tab label="Sign Up" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login handleChange={handleChange} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register handleChange={handleChange} />
        </TabPanel>
      </Paper>
    </div>
  );
};

export default SignInOutContainer;
