import { contactsReducer } from "./contactsReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
    },
    
});

