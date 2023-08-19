// import { useEffect } from 'react';
// import AddContact from './components/AddContact/AddContact';
// import Contacts from './components/Contacts/Contacts';
// import Filter from 'components/Filter/Filter';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthentificated, selectToken } from 'redux/selectors';
import { refreshUserThunk } from 'redux/auth/actions';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import Navigation from 'components/Navigation/Navigation';
import NotExisting from 'components/NotExisting/NotExisting';

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

  return (
    <div className="App">
      <Navigation />
      
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
            <Route path="*" element={<NotExisting />}/>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
