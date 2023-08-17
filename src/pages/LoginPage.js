import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUserThunk} from 'redux/actions';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const LoginPage = () => {

  const dispatch = useDispatch();

  // const handleFormSubmit = e => {
  //   e.preventDefault();

  //   const form = e.currentTarget;
  //   const email = form.elements.userEmail.value;
  //   const password = form.elements.userPassword.value;


  //   dispatch(loginUserThunk({
  //     email,
  //     password
  //   }))
  //  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().min(2).required('Please fill in this field'),
      password: Yup.string().min(7).required('Please fill in this field'),
    }),
    onSubmit: values => {
      dispatch(loginUserThunk({
        email: values.email,
        password: values.password
      }));
      formik.resetForm();
    },
  });

   
  return <div>
    <h1>Log In</h1>
    <form onSubmit={formik.handleSubmit}>
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
      <button type='submit'>Sign Up</button>
    </form>
  </div>;
};
      
      
    export default LoginPage;
