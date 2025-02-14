import * as React from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaPaw } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import getDogBreeds from '../../rest/dogs/getDogBreeds';
import FilterDropdown from '../FilterDropdown';
import { SearchQueryContext } from '../../contexts/SearchQueryContext';
import { v4 as uuidv4 } from 'uuid';
import { ErrorsContext } from '../../contexts/ErrorContext';

interface BreedFilterProps extends React.HTMLAttributes<HTMLElement> {
  onSearchByBreed: (selectedBreeds: string[]) => void;
}

const fetchErrorId = uuidv4();

const BreedFilter = (props: BreedFilterProps) => {
  const searchQueryContext = useContext(SearchQueryContext);
  const [dogBreeds, setDogBreeds] = useState<string[]>([]);
  const errorContext = useContext(ErrorsContext);
  const { handleAddError } = errorContext;
  const { className, onSearchByBreed } = props;

  const { selectedBreeds, setSelectedBreeds } = searchQueryContext;

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      const resp = await getDogBreeds();

      if (!resp.ok) {
        handleAddError({
          message: 'Something went wrong, try again',
          id: fetchErrorId,
        });
        return;
      }

      const breeds = await resp.json();
      setDogBreeds(breeds);
    } catch (error) {
      console.error(error);
      handleAddError({
        message: error,
        id: fetchErrorId,
      });
    }
  };

  const handleRemoveBreed = (breedToRemove: string) => {
    if (!selectedBreeds.includes(breedToRemove)) {
      return;
    }

    setSelectedBreeds(
      selectedBreeds.filter((breed) => breed !== breedToRemove),
    );
  };

  const handleSelectedBreed = (newBreed: string) => {
    if (selectedBreeds.includes(newBreed)) {
      handleRemoveBreed(newBreed);
      return;
    }

    setSelectedBreeds([...selectedBreeds, newBreed]);
  };

  return (
    <div className={className}>
      <FilterDropdown
        selectedOptions={selectedBreeds}
        onSearch={() => onSearchByBreed(selectedBreeds)}
        options={dogBreeds}
        onOptionSelect={(value) => handleSelectedBreed(value)}
        onRemoveOption={(value) => handleRemoveBreed(value)}
        label={
          <BreedLabel>
            <FaPaw /> Breed <FaChevronDown />
          </BreedLabel>
        }
      />
    </div>
  );
};

const BreedLabel = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 0.5rem;
`;

export default styled(BreedFilter)``;
