import * as React from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaSearchLocation } from 'react-icons/fa';
import Input from '../Input';
import Button from '../Button';
import DropdownShell from '../DropdownShell';
import useInput from '../../hooks/useInput';

interface ZipCodeFilterProps extends React.HTMLAttributes<HTMLElement> {
  onFilterByZipCode: (zipcode: string) => void;
  onResetZipCode: () => void;
}

const ZipCodeFilter = (props: ZipCodeFilterProps) => {
  const zipCodeInput = useInput('');

  const { className, onFilterByZipCode, onResetZipCode } = props;

  return (
    <DropdownShell
      label={
        <LocationLabel>
          <FaSearchLocation /> Zipcode <FaChevronDown />
        </LocationLabel>
      }
    >
      <div className={className}>
        <Input
          type='number'
          name='zipcode'
          label='Filter by zipcode'
          placeholder='Enter a zip code'
          {...zipCodeInput}
        />

        <Actions>
          <Button onClick={() => onResetZipCode()}>Reset filter</Button>

          <Button primary onClick={() => onFilterByZipCode(zipCodeInput.value)}>
            Show dogs
          </Button>
        </Actions>
      </div>
    </DropdownShell>
  );
};

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const LocationLabel = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 0.5rem;
`;

export default styled(ZipCodeFilter)``;
