import { createSlice } from '@reduxjs/toolkit';
import { fetchAllContacts, addContact, deleteContactById } from './thunks';

const initialState = {  
    items: [],
    isLoading: false,
    error: null,
    filter: '',
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },

    extraReducers: (builder) => 
        builder 
            .addCase(fetchAllContacts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchAllContacts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addContact.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(addContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteContactById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteContactById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter(
                    contact => contact.id !== action.payload,
                );
            })
            .addCase(deleteContactById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    
});

export const { setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;


// export const contactDetailsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_CONTACT: {
//       return {
//         ...state,
//         contacts: [action.payload, ...state.contacts],
//       };
//     }
//     case SET_FILTER: {
//       return {
//         ...state,
//         filter: action.payload,
//       };
//     }
//     case SET_DELETE: {
//       return {
//         ...state,
//         contacts: state.contacts.filter(
//           contact => contact.id !== action.payload
//         ),
//       };
//     }
//     case ADD_CONTACTS_FROM_STORAGE: {
//       return {
//         ...state,
//         contacts: action.payload,
//       };
//     }
//     default:
//       return state;
//   }
// };

// export const setContact = (payload) => {
//     return {
//         type: SET_CONTACT,
//         payload: payload
//     }
// };

// export const setFilter = (filter) => {
//     return {
//         type: SET_FILTER,
//         payload: filter
//     }
// };

// export const setDelete = (contactId) => {
//     return {
//         type: SET_DELETE,
//         payload: contactId
//     }
// };
