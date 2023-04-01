import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {
  Li,
  Ul,
  Paragraph,
  DeleteButton,
  EditButton,
} from './ContactList.styled';
import { getContacts, getFilter } from '../../redux/selectors';
import { deleteContact } from '../../redux/contactSlice';

const ContactList = props => {
  const dispatch = useDispatch();
  const { onContactEdit } = props;

  const contacts = useSelector(getContacts);
  const filterData = useSelector(getFilter);
  const filter = filterData?.filter ?? '';
  return (
    <Ul>
      {contacts
        .filter(
          contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()) ||
            contact.number.includes(filter)
        )
        .map(contact => (
          <Li key={contact.id}>
            <Paragraph>{`${contact.name}: ${contact.number}`}</Paragraph>
            <Tooltip title="Edit">
              <IconButton
                type="button"
                onClick={() => onContactEdit(contact.id)}
              >
                <EditButton color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                type="button"
                onClick={() => dispatch(deleteContact(contact.id))}
              >
                <DeleteButton color="primary" />
              </IconButton>
            </Tooltip>
          </Li>
        ))}
    </Ul>
  );
};

ContactList.propTypes = {
  onContactEdit: PropTypes.func.isRequired,
};

export default ContactList;
