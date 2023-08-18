import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUserThunk } from 'redux/actions';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, Grid, TextField, Typography} from '@mui/material';

const RegisterPage = () => {

  const dispatch = useDispatch();

  // const handleSubmit = e => {
  //   e.preventDefault();

  //   const form = e.currentTarget;

  //   const name = form.elements.userName.value;
  //   const email = form.elements.userEmail.value;
  //   const password = form.elements.userPassword.value;


  //   dispatch(registerUserThunk({
  //     name,
  //     email,
  //     password
  //   }))
  //  }

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

  return <div>
    <Box xs={{
      display: 'flex',
      marginTop: 32,
      marginRight: 'auto',
      marginLeft: 'auto',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'

    }}>
    <Typography variant='h5' display='block'>Register</Typography>
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
      <Grid item xs={12} md={8}>        
       <TextField
          type='text' 
          name="name" 
          label="Name"
          fullWidth
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
          {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
      </Grid>
      <br/>
      <Grid item xs={12} md={8}>
        <TextField 
          type='email' 
          name='email' 
          label="Email"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
          {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}
      </Grid>
      <br/>
      <Grid item xs={12} md={8}>
        <TextField
          type='password' 
          name='password' 
          label="Password"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
          {formik.errors.password && formik.touched.password ? <div className="error">{formik.errors.password}</div> : null}
      </Grid>
      </Grid>
      <br/>
      <Button 
        variant="contained" 
        color='secondary' 
        size='small' 

        type='submit'>Sign Up</Button>
    </Box></Box>
  </div>;
};
      
    export default RegisterPage;
