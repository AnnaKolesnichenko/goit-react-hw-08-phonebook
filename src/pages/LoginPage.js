import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from 'redux/auth/actions';
import { selectAuthentificated } from 'redux/selectors';
import { Navigate } from 'react-router-dom';
import FormikError from 'components/FormikError/FormikError';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { backgroundStyles } from 'images/background';

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
      >
      <Typography variant="h6" display="block" marginBottom={4} marginTop={10}>
        LOG IN
      </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Grid item xs={12} md={10}>
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
                  <FormikError error={formik.errors.email}/>
                ) : null}
            </Grid>
            <br />
            <Grid item xs={12} md={10}>
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
                  <FormikError error={formik.errors.password}/>
                ) : null}
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
