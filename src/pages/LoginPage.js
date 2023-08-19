import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from 'redux/actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import p from '../images/white.jpeg';
import { selectAuthentificated } from 'redux/selectors';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthentificated);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().min(2).required('Please fill in this field'),
      password: Yup.string().min(7).required('Please fill in this field'),
    }),
    onSubmit: values => {
      dispatch(
        loginUserThunk({
          email: values.email,
          password: values.password,
        })
      );
      formik.resetForm();
    },
  });

  if (authenticated) return <Navigate to="/contacts" />;


  const backgroundStyles = {
    backgroundImage: `url(${p})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    width: '100vw',
    height: '100vh',
    marginTop: '-10px'
  };


  return (
    <div style={backgroundStyles}>
      
      <Box
        sx={{
          display: 'flex',
          marginTop: 32,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 600,
          margin: '0 auto',
        }}
      ><Typography variant="h6" display="block" marginBottom={4} marginTop={10}>
        LOG IN
      </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Grid item xs={12} md={10}>
              <label>
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  fullWidth
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="error" style={{color: '#ef7373', textAlign: 'left', marginTop: 10}}>{formik.errors.email}</div>
                ) : null}
              </label>
            </Grid>
            <br />
            <Grid item xs={12} md={10}>
              <label>
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  fullWidth
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="error" style={{color: '#ef7373', textAlign: 'left', marginTop: 10}}>{formik.errors.password}</div>
                ) : null}
              </label>
            </Grid>
            <br />
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ marginTop: 4, marginBottom: 4 }}
              type="submit"
            >
              Sign Up
            </Button>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
