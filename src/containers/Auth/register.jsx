import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { unwrapResult } from '@reduxjs/toolkit';
import { message } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Logo from '../../assets/images/logo-movie.png';
import { checkPath, Signup } from './authSlice';

Register.propTypes = {
  onSubmit: PropTypes.func,
};

Register.defaultProps = {
  onSubmit: null,
};

function Register({ handleChange }) {
  const dispatch = useDispatch();

  const paperStyle = { padding: '30px 20px', width: 400 };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: '#1bbd7e' };

  const initialValues = {
    user: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phoneNumber: '',
    checkboxOption: [],
    termsAndConditions: false,
  };

  const validationSchema = Yup.object().shape({
    user: Yup.string().min(5, "It's too short").required('Required'),
    password: Yup.string()
      .min(5, 'Password minimum length should be 5')
      .max(30, 'Password maximum length should be 30')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password not matched')
      .required('Required'),
    name: Yup.string().min(3, "It's too short").required('Required'),
    email: Yup.string().email('Enter valid email').required('Required'),

    phoneNumber: Yup.number()
      .typeError('Enter valid Phone Number')
      .required('Required'),

    termsAndConditions: Yup.string().oneOf(
      ['true'],
      'Accept terms & conditions'
    ),
  });

  const onSubmit = async (values) => {
    var submit = {
      taiKhoan: values.user,
      matKhau: values.password,
      email: values.email,
      soDt: values.phoneNumber,
      maNhom: 'GP01',
      // "maLoaiNguoiDung": "string",
      hoTen: values.name,
    };

    // dispatch(Signup(submit));

    console.log(values);

    try {
      const submitRegister = await dispatch(Signup(submit));
      const result = unwrapResult(submitRegister);
      console.log(result);
      console.log(submitRegister);
      if (result) {
        message.success({
          content: 'Register success',

          className: 'custom-class',

          style: {
            marginTop: '2vh',
          },
        });
        dispatch(checkPath(true));
        handleChange('event', 0);
      }
    } catch (error) {
      message.error({
        content: 'Register fail',

        className: 'custom-class',

        style: {
          marginTop: '2vh',
        },
      });
    }
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <img style={{ width: '60px' }} src={Logo} />
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                variant="standard"
                fullWidth
                name="email"
                label="Email"
                placeholder="Enter your email"
                helperText={
                  <ErrorMessage name="email">
                    {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                  </ErrorMessage>
                }
              />

              <Field
                as={TextField}
                variant="standard"
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter your phone number"
                helperText={
                  <ErrorMessage name="phoneNumber">
                    {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                variant="standard"
                fullWidth
                name="user"
                label="User"
                placeholder="Enter your User"
                helperText={
                  <ErrorMessage name="user">
                    {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                variant="standard"
                fullWidth
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                // helperText={<ErrorMessage name="password" />}
                helperText={
                  <ErrorMessage name="password">
                    {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                variant="standard"
                fullWidth
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                helperText={
                  <ErrorMessage name="confirmPassword">
                    {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                  </ErrorMessage>
                }
              />
              <Field
                as={TextField}
                variant="standard"
                fullWidth
                name="name"
                label="Name"
                placeholder="Enter your User"
                helperText={
                  <ErrorMessage name="name">
                    {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                  </ErrorMessage>
                }
              />

              <FormControlLabel
                control={<Field as={Checkbox} name="termsAndConditions" />}
                label="I accept the terms and conditions."
              />
              <FormHelperText>
                <ErrorMessage name="termsAndConditions">
                  {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                </ErrorMessage>
              </FormHelperText>
              <Button
                type="submit"
                variant="contained"
                disabled={props.isSubmitting}
                color="primary"
                fullWidth
              >
                {props.isSubmitting ? 'Loading' : 'Sign up'}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}

export default Register;
