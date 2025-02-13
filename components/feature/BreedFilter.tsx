import * as React from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaPaw } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import getDogBreeds from '../../rest/dogs/getDogBreeds';
import FilterDropdown from '../FilterDropdown';
import { SearchQueryContext } from '../../contexts/SearchQueryContext';

interface BreedFilterProps extends React.HTMLAttributes<HTMLElement> {
  onSearchByBreed: (selectedBreeds: string[]) => void;
}

const BreedFilter = (props: BreedFilterProps) => {
  const searchQueryContext = useContext(SearchQueryContext);
  const [dogBreeds, setDogBreeds] = useState<string[]>([]);

  const { className, onSearchByBreed } = props;

  const { selectedBreeds, setSelectedBreeds } = searchQueryContext;

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      const resp = await getDogBreeds();

      if (!resp.ok) {
        //TODO: handle error
        return;
      }

      const breeds = await resp.json();
      setDogBreeds(breeds);
    } catch (e) {
      console.error(e);
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
