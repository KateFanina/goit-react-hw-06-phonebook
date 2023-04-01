import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import { Input, FindName } from './Filter.styled';

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <>
      <FindName>Find contact by name or number</FindName>
      <Input
        type="text"
        onChange={event => dispatch(setFilter(event.target.value))}
      />
    </>
  );
};

export default Filter;
