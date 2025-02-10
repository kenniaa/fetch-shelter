import { bounceUnlessLoggedIn } from '../lib/bounce';
import searchDogs from '../../../rest/dogs/searchDogs';
import {useContext, useEffect, useState} from 'react';
import getDogBreeds from '../../../rest/dogs/getDogBreeds';
import Button from '../..//Button';
import * as React from 'react';
import DogCardGroup from '../../DogCardGroup';

import Dropdown from '../../Dropdown';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';
import Input from '../../Input';
import useInput from '../../../hooks/useInput';
import {FavoritesContext} from '../../../contexts/FavoritesContext';
import createMatch from '../../../rest/dogs/createMatch';

// export const getServerSideProps = bounceUnlessLoggedIn

interface ResultsPageProps {

}

interface SortObject {
  label: string,
  value: string,
  icon: string,
  field: string,
  direction: string,
}

const sortOptions = [
  {
    label: 'Youngest',
    value: 'youngest',
    field: 'age',
    direction: 'asc',
    icon: 'fas fa-sm fa-sort-numeric-down'
  },
  {
    label: 'Oldest',
    value: 'oldest',
    field: 'age',
    direction: 'desc',
    icon: 'fas fa-sm fa-sort-numeric-down-alt'
  },
  {
    label: 'Name, A-Z',
    value: 'name-a-z',
    field: 'name',
    direction: 'asc',
    icon: 'fas fa-sm fa-sort-alpha-down'
  },
  {
    label: 'Name, Z-A',
    value: 'name-z-a',
    field: 'name',
    direction: 'desc',
    icon: 'fas fa-sm fa-sort-alpha-down-alt'
  },
  {
    label: 'Breed, A-Z',
    value: 'breed-a-z',
    field: 'breed',
    direction: 'asc',
    icon: 'fas fa-sm fa-sort-alpha-down'
  },
  {
    label: 'Breed, Z-A',
    value: 'breed-z-a',
    field: 'breed',
    direction: 'desc',
    icon: 'fas fa-sm fa-sort-alpha-down-alt'
  },
];

const ResultsPage = (props: ResultsPageProps) => {
  const [results, setResults] = useState<string[]>([]);
  const [match, setMatch] = useState<string>('');
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [dogBreeds, setDogBreeds] = useState<string[]>([]);
  const [next, setNext] = useState<string>('');
  const [prev, setPrev] = useState<string>('');
  const [totalFound, setTotalFound] = useState<number>(0);

  const [sortBy, setSortBy] = useState<SortObject>({
    label: 'Name, A-Z',
    value: 'name-a-z',
    field: 'name',
    direction: 'asc',
    icon: 'fas fa-sm fa-sort-alpha-down'
  });

  const zipCodeInput = useInput('');

  const favoritesContext = useContext(FavoritesContext);

  const {
    favorites
  } = favoritesContext;

  useEffect(() => {
    fetchBreeds()
  }, []);

  const handleSearch = async (newSortBy?: SortObject, zipCodes?: string[]) => {
    try {
      const resp = await searchDogs({
        breeds: selectedBreeds,
        sortBy: newSortBy ?? sortBy,
        zipCodes
      })

      if (!resp.ok) {
        //TODO: handle error
        return;
      }

      const {
        resultIds,
        next,
        prev,
        total
      } = await resp.json();

      setResults(resultIds);
      setNext(next);
      setPrev(prev);
      setTotalFound(total);
    } catch (error) {
      console.error(error);
      //TODO: handle error
    }
  }

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
  }

  const handleRemoveSelectedItem = (selectedBreed) => {
    if (!selectedBreeds.includes(selectedBreed)) {
      return;
    }

    setSelectedBreeds(selectedBreeds.filter(breed => breed !== selectedBreed));
  }

  const handleSort = async (selectedItem) => {
    setSortBy(selectedItem);
    await handleSearch(selectedItem)
  }

  const handleMatch = async () => {
    try {
      const resp = await createMatch(favorites);

      if (!resp.ok) {
        //TODO: handle error
        return;
      }

      const respObj = await resp.json();
      setMatch(respObj.match);
    } catch (e) {
      console.error(e);
    }
  }

  const handleLoadNext = async () => {
    try {
      const resp = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${next}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!resp.ok) {
        //TODO: handle error
        return;
      }

      const {
        resultIds,
        next: newNext,
        prev: newPrev,
        total
      } = await resp.json();

      setResults(resultIds);
      setNext(newNext);
      setPrev(newPrev);
      setTotalFound(total);
    } catch (error) {
      console.error(error);
      //TODO: handle error
    }
  }

  const handlePreviousDogs = async () => {
    try {
      const resp = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${prev}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!resp.ok) {
        //TODO: handle error
        return;
      }

      const {
        resultIds,
        next: newNext,
        prev: newPrev,
        total
      } = await resp.json();

      setResults(resultIds);
      setNext(newNext);
      setPrev(newPrev);
      setTotalFound(total);
    } catch (error) {
      console.error(error);
      //TODO: handle error
    }
  }

  const handleSelectedBreeds = (newBreeds) => {
    setSelectedBreeds(newBreeds);
  }

  const handleZipCodeFilter = async () => {
    await handleSearch(sortBy, [zipCodeInput.value]);
  }

  return (
    <div>
      <div>
        FAVORITES:
        {favorites?.map((favorite, index) => (
          <div key={`${favorite}-${index}`}>
            {favorite}
          </div>
        ))}

        <Button
          onClick={() => handleMatch()}
        >
          Match me with a dog
        </Button>
      </div>


      {match &&
        <DogCardGroup itemIds={[match]}/>
      }

      <div>
        SORT THIS BY: {sortBy.label}

        <Dropdown
          label='Sort by'
          selectedItem={sortBy ?? null}
          onSetItem={async (newSelectedItem) => {
            await handleSort(newSelectedItem)
          }}
          items={sortOptions}
        />
      </div>

      <div>
        Filter by a zipcode
        <Input
          type='number'
          name='zipcode'
          label='Zip Code'
          placeholder='Enter a zip code'
          {...zipCodeInput}
        />

        <Button
          onClick={() => handleZipCodeFilter()}
        >
          Show dogs
        </Button>
      </div>

      <DogCardGroup itemIds={results}/>

      <Pagination>
        <Button onClick={() => handlePreviousDogs()}>
          Previous
        </Button>

        <Button onClick={() => handleLoadNext()}>
          Next
        </Button>
      </Pagination>
    </div>
  )
}

const SearchBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.25fr;
  width: 100%;
  grid-gap: 0.5rem;
`;

const SearchBox = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
`;

const Breed = styled.div`
  background: #424242;
  color: #FFF;
  padding: 0.45rem 0.75rem;
  font-size: 15px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  grid-gap: 0.25rem;
`;

const BreedFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ResultsPage;
