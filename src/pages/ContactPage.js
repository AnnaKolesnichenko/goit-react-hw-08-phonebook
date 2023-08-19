import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createContactThunk,
  deleteContactThunk,
  requestContactsThunk,
} from 'redux/contacts/contactsActions';
import {
  selectAuthentificated,
  selectContactsError,
  selectContactsIsLoading,
  selectUserContacts,
} from 'redux/selectors';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import FormikError from 'components/FormikError/FormikError';

import { backgroundStyles } from 'images/background';

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
      const doubleName = contacts.some(contact => contact.name === values.name);
      const doubleNumber = contacts.some(contact => contact.number === values.number);

      if(doubleName || doubleNumber) {
        formik.setFieldError('name', 'This name is already in use');      
      } else {
        dispatch(
        createContactThunk({
          name: values.name,
          number: values.number,
        })
      );
    }      
      // formik.resetForm();
    },
  });

  const allContacts = Array.isArray(contacts) && contacts.length > 0;

  return (
    <div style={backgroundStyles} >
      <Box
        sx={{
          display: 'flex',
          marginTop: 32,
          flexDirection: 'column',
          width: '100%',
          maxWidth: 500,
          margin: '10px 10px',
        }}
      >
        <Typography
          variant="subtitle1"
          display="block"
          marginBottom={2}
          marginTop={2}
          textAlign="left"
        >
          ADD CONTACT
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={8} md={10}>
              <TextField
                type="name"
                name="name"
                label="Name"
                fullWidth
                size="small"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name ? (
                <FormikError error={formik.errors.name}/>
              ) : null}
            </Grid>
            <br />
            <Grid item xs={8} md={10}>
              <TextField
                type="number"
                name="number"
                label="Number"
                fullWidth
                size="small"
                variant="outlined"
                value={formik.values.number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.number && formik.touched.number ? (
                <FormikError error={formik.errors.number}/>
              ) : null}
            </Grid>
            <br />
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                sx={{
                  marginTop: 1,
                  marginBottom: 2,
                  width: '100px',
                  marginLeft: '-140px',
                }}
                type="submit"
              >
                ADD
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {isLoading && <p>Loading</p>}
      {error && <p> There is something wrong there...</p>}

      <Grid
        container
        display="flex"
        flexDirection="column"
        margin="10px 10px"      
      >
        {allContacts && (
          <Typography
            variant="h6"
            textAlign="left"
            marginBottom={2}
            color="#0e4686"
          >
            ContactList
          </Typography>
        )}
        <List sx={{ width: '100%', maxWidth: 650, listStyle: 'none' }}>
          {allContacts &&
            contacts.map(contact => {
              return (
                <ListItem
                  key={contact.id}
                  sx={{ paddingLeft: '0' }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => dispatch(deleteContactThunk(contact.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Typography variant="subtitle1" marginRight={4} width="200px" >
                    Name: {contact.name}
                  </Typography>
                  <Typography variant="subtitle1" marginRight={4}>
                    Number: {contact.number}
                  </Typography>
                </ListItem>
              );
            })}
        </List>
      </Grid>
    </div>
  );
};

export default ContactPage;
