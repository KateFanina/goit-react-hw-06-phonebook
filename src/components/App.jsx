import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import CloseIcon from '@mui/icons-material/Close';
import ContactForm from './contactForm';
import ContactList from './contactList';
import Filter from './filter';
import Modal from './modal/Modal';
import { TitleMain, TitleList, CloseButton } from './App.styled';
import { getContacts } from '../redux/selectors';
import { addContact, editContact } from '../redux/contactSlice';

function App() {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const contacts = useSelector(getContacts);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const validateExistContact = ({ contacts, values }) => {
    const messages = [];
    if (contacts.some(contact => contact.number === values.number)) {
      const user = contacts.find(
        contact => contact.number === values.number
      ).name;
      messages.push(`${values.number} is already belongs to ${user}!`);
    }
    if (contacts.some(contact => contact.name === values.name)) {
      const phone = contacts.find(
        contact => contact.name === values.name
      ).number;
      messages.push(
        `${values.name} is already containce in phonebook with phone ${phone}!`
      );
    }
    if (messages.length && !showModal) {
      alert(messages.join('\n'));
    }
    return !!messages.length;
  };

  const handleSubmit = (values, actions) => {
    if (
      validateExistContact({
        contacts,
        values,
      }) &&
      !showModal
    ) {
      return;
    }
    if (id) {
      dispatch(
        editContact({
          id,
          name: values.name,
          number: values.number,
        })
      );
    } else {
      dispatch(
        addContact({
          id: nanoid(),
          name: values.name,
          number: values.number,
        })
      );
    }
    setId('');
    setShowModal(false);
    actions.resetForm({
      name: '',
      number: '',
    });
  };

  const onContactEdit = id => {
    const currentContact = contacts.find(contact => contact.id === id);
    setShowModal(!showModal);
    setId(currentContact.id);
    setName(currentContact.name);
    setNumber(currentContact.number);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      {showModal && (
        <Modal onClose={toggleModal}>
          <CloseButton onClick={toggleModal}>
            <CloseIcon />
          </CloseButton>
          <ContactForm
            contact={{
              name,
              number,
            }}
            handleSubmit={(values, actions) => handleSubmit(values, actions)}
          />
        </Modal>
      )}
      <div>
        {!showModal && (
          <>
            <TitleMain>Phonebook</TitleMain>
            <ContactForm
              handleSubmit={(values, actions) => handleSubmit(values, actions)}
            />
          </>
        )}

        <TitleList>Contacts</TitleList>
        <Filter />
        <ContactList onContactEdit={id => onContactEdit(id)} />
      </div>
    </div>
  );
}

export default App;
