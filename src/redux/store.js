import { authentReducer } from './auth/authentReducer';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { contactsReducer } from './contacts/contactsReducer';

const authentPersistConfig = {
  key: 'authent',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    authent: persistReducer(authentPersistConfig, authentReducer),
    contacts: contactsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
