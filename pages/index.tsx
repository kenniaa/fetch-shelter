import { bounceUnlessLoggedIn } from '../lib/bounce';
import Page from "../components/Page";
import searchDogs from "../rest/dogs/searchDogs";
import {useContext, useEffect, useState} from "react";
import getDogBreeds from "../rest/dogs/getDogBreeds";
import FilterDropdown from "../components/FilterDropdown";
import Button from "../components/Button";
import * as React from "react";
import DogCardGroup from "../components/DogCardGroup";
import {FavoritesContext, FavoritesContextProvider} from "../contexts/FavoritesContext";
import createMatch from "../rest/dogs/createMatch";
import Dropdown from "../components/Dropdown";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

// export const getServerSideProps = bounceUnlessLoggedIn

export default function WrappedIndex() {
  return (
    <FavoritesContextProvider>
      <Index />
    </FavoritesContextProvider>
  )
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

function Index() {
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
  const favoritesContext = useContext(FavoritesContext);

  const {
    favorites
  } = favoritesContext;

  useEffect(() => {
    fetchBreeds()
  }, []);

  const handleSearch = async () => {
    try {
      const resp = await searchDogs({
        breeds: selectedBreeds,
        sortBy: sortBy
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

  const handleSelectedBreed = (selectedBreed: string) => {
    if (selectedBreeds.includes(selectedBreed)) {
      setSelectedBreeds(selectedBreeds.filter(breed => breed !== selectedBreed));
      return;
    }

    setSelectedBreeds([...selectedBreeds, selectedBreed]);
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

  return (
    <Page>
      <div>
        FAVORITES:
        {favorites?.map((favorite, index) => (
          <div key={`${favorite}-${index}`}>
            {favorite}
          </div>
        ))}
      </div>

      <Button onClick={() => handleMatch()}>Match me with a dog</Button>

      <DogCardGroup itemIds={[match]} />

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
        Filter by breeds:
        {selectedBreeds?.map((breed, index) => (
          <div key={`${breed}-${index}`}>
            {breed}
          </div>
        ))}
      </div>

      <FilterDropdown
        buttonLabel='Breeds'
        filterPlaceholder='Type to search breeds'
        onOptionSelect={(selectedBreed: string) => handleSelectedBreed(selectedBreed)}
        isOptionSelected={(option: string) => {
          return selectedBreeds?.includes(option)
        }}
        options={dogBreeds}
      />

      <Button onClick={() => handleSearch()}>Submit</Button>

      <DogCardGroup itemIds={results} />

      <Pagination>
        <Button onClick={() => handlePreviousDogs()}>
          Previous
        </Button>

        <Button onClick={() => handleLoadNext()}>
          Next
        </Button>
      </Pagination>
    </Page>
  )
}

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
`;
