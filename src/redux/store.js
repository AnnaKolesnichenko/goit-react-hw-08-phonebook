import { authentReducer } from './authentReducer';
import { configureStore } from '@reduxjs/toolkit';
import {
  Persistor,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';

const authentPersistConfig = {
  key: 'authent',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    authent: persistReducer(authentPersistConfig, authentReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
