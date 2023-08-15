import css from './contacts.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllContacts, deleteContactById } from 'redux/thunks';
import { contactState, filterState } from 'redux/selectors';
import { useEffect } from 'react';


const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(contactState);
  const filter = useSelector(filterState) || '';

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const filteredNames = contacts
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];


  if (filteredNames) {
    return (
      <div className={css.main}>
        <h1 className={css.title}>Contacts</h1>
        <ul className={css.list}>
          {filteredNames.length === 0
            ? 'There is no contact added'
            : filteredNames.map(contact => {
                return (
                  <li className={css.list_item} key={contact.id}>
                    {contact.name}: {contact.number}
                    <button
                      className={css.delete_btn}
                      onClick={() => dispatch(deleteContactById(contact.id))}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
        </ul>
      </div>
    );
  } else {
    return 'There is nothing added here yet...';
  }
};

export default Contacts;
