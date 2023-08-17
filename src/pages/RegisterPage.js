import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUserThunk } from 'redux/actions';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';

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
    <h1>Register</h1>
    <form onSubmit={formik.handleSubmit}>
      <label>
        <p>Name</p>
        <input 
          type='text' 
          name="name" 
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
          {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
      </label>
      <br/>
      <label>
        <p>Email</p>
        <input 
          type='email' 
          name='email' 
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
          {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}
      </label>
      <br/>
      <label>
        <p>Password</p>
        <input 
          type='password' 
          name='password' 
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
          {formik.errors.password && formik.touched.password ? <div className="error">{formik.errors.password}</div> : null}
      </label>
      <br/>
      <Button 
        variant="contained" 
        color='secondary' 
        size='small' 

        type='submit'>Sign Up</Button>
    </form>
  </div>;
};
      
    export default RegisterPage;
