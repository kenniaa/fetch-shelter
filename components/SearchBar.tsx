import * as React from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import Input from './Input';
import Button from './Button';

interface SearchBarProps extends React.HTMLAttributes<HTMLElement> {
  placeholder: string;
  onSearch: (value: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const searchInput = useInput('');

  const { className, placeholder, onSearch } = props;

  return (
    <div className={className}>
      <Input
        hideLabel
        type='text'
        name='search'
        label='search'
        placeholder={placeholder}
        {...searchInput}
      />

      <Button primary onClick={() => onSearch(searchInput.value)}>
        Search
      </Button>
    </div>
  );
};

export default styled(SearchBar)`
  width: 100%;
  display: flex;
  grid-gap: 0.5rem;
`;
