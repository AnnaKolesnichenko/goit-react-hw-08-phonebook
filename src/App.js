// import { useEffect } from 'react';
// import AddContact from './components/AddContact/AddContact';
// import Contacts from './components/Contacts/Contacts';
// import Filter from 'components/Filter/Filter';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthentificated, selectToken } from 'redux/selectors';
import { logoutUserThunk, refreshUserThunk } from 'redux/actions';
import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button } from '@mui/material';
// import Toolbar from '@mui/material/Toolbar';
// or
import { Toolbar } from '@mui/material';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

const HomePage = lazy(() => import('pages/HomePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const ContactsPage = lazy(() => import('pages/ContactPage'));

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const authentificated = useSelector(selectAuthentificated);

  useEffect(() => {
    if (!token || authentificated) {
      return;
    }

    dispatch(refreshUserThunk());
  }, [token, authentificated, dispatch]);

  const handleLogOut = () => {
    dispatch(logoutUserThunk());
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <nav>
              <Button
                component={NavLink}
                to="/"
                color="inherit"
                size="large"
                sx={{ marginRight: 'auto' }}
              >
                phonebook
              </Button>
              {authentificated ? (
                <>
                  <Button
                    component={NavLink}
                    to="/contacts"
                    color="inherit"
                    size="large"
                  >
                    Contacts
                  </Button>
                  <Button
                    component={NavLink}
                    onClick={handleLogOut}
                    color="inherit"
                    size="large"
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={NavLink}
                    to="/login"
                    color="inherit"
                    size="large"
                  >
                    Login
                  </Button>
                  <Button
                    component={NavLink}
                    to="/register"
                    color="inherit"
                    size="large"
                  >
                    Register
                  </Button>
                </>
              )}
            </nav>
          </Box>
        </Toolbar>
      </AppBar>

      <main>
        <Suspense fallback={<p>adding</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo="/login">
                  <ContactsPage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
