import { createSlice } from '@reduxjs/toolkit';
import baseContacts from '../resources/contacts.json';

const contactsInitialState = baseContacts;

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact(state, action) {
      state.push(action.payload);
    },
    deleteContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
    editContact(state, action) {
      for (const contact of state) {
        if (contact.id === action.payload.id) {
          contact.name = action.payload.name;
          contact.number = action.payload.number;
          break;
        }
      }
    },
  },
});

export const { addContact, deleteContact, editContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
