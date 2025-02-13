import * as React from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { SearchQueryContext } from '../../contexts/SearchQueryContext';
import { FaTimes } from 'react-icons/fa';
import Button from '../Button';

interface AppliedFiltersProps extends React.HTMLAttributes<HTMLElement> {}

const AppliedFilters = (props: AppliedFiltersProps) => {
  const searchQueryContext = useContext(SearchQueryContext);

  const {
    zipCodes,
    // setZipCodes,
    // sortBy,
    // setSortBy,
    selectedBreeds,
  } = searchQueryContext;

  const { className } = props;

  return (
    <div className={className}>
      Applied Filters:
      {zipCodes?.map((code) => (
        <Filter key={code}>
          {code}

          <Button
            bare
            // onClick={() => onFilterByZipCode()}
          >
            <FaTimes />
          </Button>
        </Filter>
      ))}
      {selectedBreeds?.map((breed) => (
        <Filter key={breed}>
          {breed}

          <Button
            bare
            // onClick={() => onRemoveOption(option)}
          >
            <FaTimes />
          </Button>
        </Filter>
      ))}
    </div>
  );
};

const Filter = styled.div`
  background: #424242;
  color: #fff;
  padding: 4px 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  grid-gap: 4px;
`;

export default styled(AppliedFilters)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  grid-gap: 0.5rem;
`;
