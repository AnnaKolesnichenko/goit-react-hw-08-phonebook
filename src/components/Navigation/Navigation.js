import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthentificated } from 'redux/selectors';
import { logoutUserThunk } from 'redux/auth/actions';

import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button } from '@mui/material';
import { Toolbar } from '@mui/material';

const Navigation = () => {
const authentificated = useSelector(selectAuthentificated);
const dispatch = useDispatch();

const handleLogOut = () => {
    dispatch(logoutUserThunk());
  };
  return (
    <div>
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
      
    </div>
  )
}

export default Navigation;
