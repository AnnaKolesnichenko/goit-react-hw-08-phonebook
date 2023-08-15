import { useState } from 'react';
import css from './addContact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { contactState } from 'redux/selectors';
import { addContact } from 'redux/thunks';

const AddContact = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const contacts = useSelector(contactState);
    const dispatch = useDispatch();

    const handleFormNameChange = (e) => {
        setName(
            e.target.value ,
        );
    };
    const handleFormNumberChange = (e) => {
        setNumber(
            e.target.value ,
        );
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newContact = {
            name: name, 
            number: number,
        };        
        const duplicateName = contacts.find(
            contact => contact.name.toLowerCase() === name.toLowerCase()
        );
        const duplicateNumber = contacts.find(
            contact => contact.number === number
        );

        if(duplicateNumber) {
            alert('existing number');
            return;
        }
    
        if (duplicateName) {
            alert('already there!!');
            return;
        } else {
            dispatch(addContact(newContact));
        }    
    
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setNumber('');
        // this.setState({name: ' ', number: ' '});
    };

        return (
            <div className={css.main}>
                <form className={css.form} onSubmit={handleFormSubmit}>
                    <label htmlFor=''>
                    <h1 className={css.main_title}>Name</h1>
                        <input
                        className={css.name_input}
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleFormNameChange}
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. 
                            For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                        />
                    </label>
                    <label htmlFor=''>
                    <h1 className={css.main_title}>Number</h1>
                        <input 
                            className={css.name_input}
                            type="tel"
                            name="number"
                            value={number}
                            onChange={handleFormNumberChange}
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                        />
                    </label>
                        <button type='submit' className={css.add_btn}>Add contact</button>
                </form>
            </div>
        )
    }


export default AddContact;