import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { unwrapResult } from '@reduxjs/toolkit';
import { message } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Logo from '../../assets/images/logo-movie.png';
import deCode from '../../utils/decode';
import { checkPath, loginUser } from './authSlice';

const Login = ({ handleChange }) => {
  const username = useFormInput('');
  const password = useFormInput('');
  let navigate = useNavigate();
  const checkPath1 = useSelector((state) => state.auth.checkPath);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(loginUser({ username, password }));
  };


  const paperStyle = {
    padding: 20,
    width: 350,
    minHeight: 360,
  };
  const btnstyle = { margin: '8px 0', borderRadius: '10px', width: '200px' };

  const initialValues = {
    username: '',
    password: '',
    remember: false,
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = async (values) => {
    var submit = {
      taiKhoan: values.username,
      matKhau: values.password,
    };

    try {
      const submitLogin = await dispatch(loginUser(submit));
      const result = unwrapResult(submitLogin);
      console.log(result);
      console.log(submitLogin);
      if (result) {
        console.log(result);
        message.success({
          content: 'Login user success',

          className: 'custom-class',

          style: {
            marginTop: '8vh',
          },
        });
        if (deCode(result.accessToken) === 'QuanTri') {
          dispatch(checkPath(true))
          navigate('/admin')
        }
        else {
          if (checkPath1) {
            dispatch(checkPath(false))
            navigate('/home')
          }
          else
            navigate(-1)
        };
      }
    } catch (error) {
      message.error({
        content: 'Login user fail',

        className: 'custom-class',

        style: {
          marginTop: '2vh',
        },
      });
    }

  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <img style={{ width: '60px' }} src={Logo} alt='pt1' />
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                style={{ marginBottom: '20px' }}
                as={TextField}
                variant="standard"
                label="Username"
                name="username"
                placeholder="Enter username"
                fullWidth
                required
                helperText={
                  <ErrorMessage name="username">
                    {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                style={{ marginBottom: '20px' }}
                as={TextField}
                variant="standard"
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                helperText={
                  <ErrorMessage name="password">
                    {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <div
                style={{
                  width: '100%',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}
              >
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={props.isSubmitting}
                  style={btnstyle}
                  fullWidth
                  onClick={handleLogin}
                >
                  {props.isSubmitting ? 'LOADING' : 'LOGIN'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <Typography component={'div'}>
          Do you have an account ?
          <Link href="#" onClick={() => handleChange('event', 1)}>
            {' '}
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

const useFormInput = (initialValue) => {
  // Initial State save user's value to input field
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
