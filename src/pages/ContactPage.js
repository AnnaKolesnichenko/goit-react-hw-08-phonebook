import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createContactThunk,
  requestContactsThunk,
} from 'redux/contactsActions';
import {
  selectAuthentificated,
  selectContactsError,
  selectContactsIsLoading,
  selectUserContacts,
} from 'redux/selectors';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const ContactPage = () => {
  const authentificated = useSelector(selectAuthentificated);
  const contacts = useSelector(selectUserContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!authentificated) {
      return;
    }

    dispatch(requestContactsThunk());
  }, [authentificated, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2).required('Please fill in this field'),
      number: Yup.string().min(7).required('Please fill in this field'),
    }),
    onSubmit: values => {
      dispatch(
        createContactThunk({
          name: values.name,
          number: values.number,
        })
      );
      formik.resetForm();
    },
  });

  const allContacts = Array.isArray(contacts) && contacts.length > 0;

  return (
    <div>
      <Typography variant="h6" display="block" marginBottom={4} marginTop={10}>
        ADD CONTACT
      </Typography>
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
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Grid item xs={12} md={10}>
              <label>
                <TextField
                  type="name"
                  name="name"
                  label="Name"
                  fullWidth
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </label>
            </Grid>
            <br />
            <Grid item xs={12} md={10}>
              <label>
                <TextField
                  type="number"
                  name="number"
                  label="Number"
                  fullWidth
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </label>
            </Grid>
            <br />
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ marginTop: 4, marginBottom: 4 }}
              type="submit"
            >
              ADD
            </Button>
          </Grid>
        </Box>
      </Box>

      {isLoading && <p>Loading</p>}
      {error && <p> There is something wrong there...</p>}

      <ul>
        {allContacts &&
          contacts.map(contact => {
            return (
              <li key={contact.id}>
                <h3>Name: {contact.name}</h3>
                <h3>Number: {contact.number}</h3>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ContactPage;
