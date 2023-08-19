
export const filterState = state => {
  return state.authent.filter;
};

export const selectLoading = state => {
  return state.authent.isLoading;
}

export const selectError = state => {
  return state.authent.error;
};

export const selectUserData = state => {
  return state.authent.useData;
};

export const selectAuthentificated = state => {
  return state.authent.authentificated;
};

export const selectToken = state => {
  return state.authent.token;
};

//CONTACTS  
export const selectUserContacts = state => {
  return state.contacts.contacts;
};

export const selectContactsIsLoading = state => {
  return state.contacts.isLoading;
};

export const selectContactsError = state => {
  return state.contacts.error;
};
