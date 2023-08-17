// import { useEffect } from 'react';
// import AddContact from './components/AddContact/AddContact';
// import Contacts from './components/Contacts/Contacts';
// import Filter from 'components/Filter/Filter';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { StyledNavLink } from 'App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthentificated, selectToken } from 'redux/selectors';
import { logoutUserThunk, refreshUserThunk } from 'redux/actions';



const HomePage = lazy(() => import('pages/HomePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const ContactsPage = lazy(() => import('pages/ContactPage'));


const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const authentificated = useSelector(selectAuthentificated);

  useEffect(() => {
    if(!token) {
      return;
    }

    dispatch(refreshUserThunk());
  }, [token, dispatch]);

  const handleLogOut = () => {
    dispatch(logoutUserThunk());
  }
  
  return (
    <div className="App">
      <header>
        <nav>
          <StyledNavLink NavLink to="/">Home</StyledNavLink>
          {authentificated ? 
          <>
            <StyledNavLink to="/contacts">Contacts</StyledNavLink>
            <button onClick={handleLogOut}>Log Out</button>
          </> 
          :
          <>
            <StyledNavLink to="/login">Login</StyledNavLink>
            <StyledNavLink to="/register">Register</StyledNavLink>
          </>}          
          
        </nav>
      </header>
      <main>
        <Suspense fallback={<p>adding</p>}>
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/contacts' element={<ContactsPage />}/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/register' element={<RegisterPage />}/>
          </Routes>
        </Suspense>
        
      </main>
    </div>
  );
};

export default App;
