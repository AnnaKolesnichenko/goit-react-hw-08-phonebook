import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestContactsThunk } from 'redux/contactsActions';
import { selectAuthentificated, selectContactsError, selectContactsIsLoading, selectUserContacts } from 'redux/selectors'

const ContactPage = () => {
  const authentificated = useSelector(selectAuthentificated);
  const contacts = useSelector(selectUserContacts);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);

  const dispatch = useDispatch();

  useEffect(() => {
    if(!authentificated) {
      return;
    }

    dispatch(requestContactsThunk());
  }, [authentificated, dispatch]);

  const allContacts = Array.isArray(contacts) && contacts.length > 0;



  return (
    <div>
      {isLoading && <p>Loading</p> }
      {error && <p> There is something wrong there...</p>}

      <ul>
        {allContacts && contacts.map(contact => {
          return (
            <li key={contact.id}>
              <h3>Name: {contact.name}</h3>
              <h3>Number: {contact.number}</h3>
            </li>
          )
        })
      }
      </ul>
      
    </div>
  )
}

export default ContactPage
