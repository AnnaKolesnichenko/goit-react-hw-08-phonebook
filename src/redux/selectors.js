
export const filterState = state => {
  return state.contacts.filter;
};

export const selectLoading = state => {
  return state.contacts.isLoading;
}

export const selectError = state => {
  return state.contacts.error;
};

export const selectUserData = state => {
  return state.contacts.useData;
};

export const selectAuthentificated = state => {
  return state.contacts.authentificated;
};

export const selectToken = state => {
  return state.contacts.token;
}
