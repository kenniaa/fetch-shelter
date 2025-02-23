import * as React from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { SearchQueryContext } from '../../contexts/SearchQueryContext';

interface AppliedFiltersProps extends React.HTMLAttributes<HTMLElement> {}

const AppliedFilters = (props: AppliedFiltersProps) => {
  const searchQueryContext = useContext(SearchQueryContext);

  const { zipCodes, selectedBreeds } = searchQueryContext;

  const { className } = props;

  return (
    <div className={className}>
      Applied Filters:
      {zipCodes?.map((code) => <Filter key={code}>{code}</Filter>)}
      {selectedBreeds?.map((breed) => <Filter key={breed}>{breed}</Filter>)}
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
