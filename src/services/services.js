import axios from 'axios';

const BASE_URL = 'https://64d0c0bdff953154bb79691b.mockapi.io/';

export const fetchContacts = async () => {
  const res =  await axios.get(`${BASE_URL}contacts`);
  return res.data;
};


export const postContact = async (contact) => {
  const res = await axios.post(`${BASE_URL}contacts`, contact);
  return res.data;
};

export const deleteContact = (contactId) => {
  const res = axios.delete(`${BASE_URL}contacts/${contactId}`);
  return res.data;
};


