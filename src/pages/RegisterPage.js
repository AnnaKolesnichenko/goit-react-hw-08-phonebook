import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from 'redux/actions';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import { selectAuthentificated } from 'redux/selectors';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {

  const dispatch = useDispatch();
  const authentificated = useSelector(selectAuthentificated);

   const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    }, 
    validationSchema: Yup.object({
      name: Yup.string().min(2).required('Please fill in this field'),
      email: Yup.string().email('Wrong email address').required('Please fill in this field'),
      password: Yup.string().min(7).required('Please fill in this field')
    }),
    onSubmit: values => {
      dispatch(registerUserThunk({
        name: values.name,
        email: values.email,
        password: values.password
      }));
      formik.resetForm();
    },
   });

   if(authentificated) {
    return <Navigate to='/contacts'/>
  };

  const FormikError = () => {
    return (
      <div className="error" style={{color: '#ef7373', textAlign: 'left', marginTop: 10}}>{formik.errors.name}</div>
    )
  }

  return <div>
    <Typography variant='h6' display='block' marginBottom={4} marginTop={10}>REGISTER</Typography>
    <Box 
    sx={{
      display: 'flex',
      marginTop: 32,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: 600,
      margin: '0 auto'
    }}>
      <Box component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} sx={{alignItems: 'center', justifyContent: 'center'}}>
      <Grid item xs={12} md={10}>
      <label>
        <TextField 
          type='text' 
          name="name" 
          label="Name"
          fullWidth
          variant='outlined'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
          {formik.errors.name && formik.touched.name ? <FormikError/> : null}
      </label>
      </Grid>
      <br/>
      <Grid item xs={12} md={10}>
      <label>
        <TextField 
          type='email' 
          name='email' 
          label='Email'
          fullWidth
          variant='outlined'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
          {formik.errors.email && formik.touched.email ? <FormikError/> : null}
      </label>
      </Grid>
      <br/>
      <Grid item xs={12} md={10}>
      <label>
        <TextField 
          type='password' 
          name='password' 
          label='Password'
          fullWidth
          variant='outlined'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
          {formik.errors.password && formik.touched.password ? <FormikError/> : null}
      </label>
      </Grid>
      </Grid>
      <br/>
      <Button 
        variant="contained" 
        color='primary'  
        size='large' 
        sx={{marginTop: 4, marginBottom: 4}}
        type='submit'>Sign Up</Button>
    </Box>
    </Box>
  </div>;
};
      
    export default RegisterPage;
