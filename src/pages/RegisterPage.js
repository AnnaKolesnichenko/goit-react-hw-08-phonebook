import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUserThunk } from 'redux/actions';

const RegisterPage = () => {

  const dispatch = useDispatch();

  const handleFormSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = form.elements.userName.value;
    const email = form.elements.userEmail.value;
    const password = form.elements.userPassword.value;


    dispatch(registerUserThunk({
      name,
      email,
      password
    }))
   }
   
  return <div>
    <h1>Register your account</h1>
    <form onSubmit={handleFormSubmit}>
      <label>
        <p>Name</p>
        <input type='text' name="userName" required minLength={2}/>
      </label>
      <br/>
      <label>
        <p>Email</p>
        <input type='email' name='userEmail' required minLength={2}/>
      </label>
      <br/>
      <label>
        <p>Password</p>
        <input type='password' name='userPassword' minLength={7} required/>
      </label>
      <br/>
      <button type='submit'>Sign Up</button>
    </form>
  </div>;
};
      
    export default RegisterPage;
