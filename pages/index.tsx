import Page from '../components/Page';
import searchDogs from '../rest/dogs/searchDogs';
import { useContext, useEffect, useState } from 'react';
import Button from '../components/Button';
import * as React from 'react';
import DogCardGroup from '../components/DogCardGroup';
import { FavoritesContextProvider } from '../contexts/FavoritesContext';
import Dropdown from '../components/Dropdown';
import styled from 'styled-components';
import ZipCodeFilter from '../components/feature/ZipCodeFilter';
import { SlideOutPanelContextProvider } from '../contexts/SlideOutPanelContext';
import BreedFilter from '../components/feature/BreedFilter';
import {
  SearchQueryContext,
  SearchQueryContextProvider,
} from '../contexts/SearchQueryContext';
import SortObject from '../lib/types';
import loadNext from '../rest/pagination/loadNext';
import loadPrev from '../rest/pagination/loadPrev';
import AppliedFilters from '../components/feature/AppliedFilters';
import { bounceUnlessLoggedIn } from '../lib/bounce';
import { ErrorsContext, ErrorsContextProvider } from '../contexts/ErrorContext';
import { v4 as uuidv4 } from 'uuid';

export const getServerSideProps = bounceUnlessLoggedIn;

export default function WrappedIndex() {
  return (
    <ErrorsContextProvider>
      <SearchQueryContextProvider>
        <FavoritesContextProvider>
          <SlideOutPanelContextProvider>
            <Index />
          </SlideOutPanelContextProvider>
        </FavoritesContextProvider>
      </SearchQueryContextProvider>
    </ErrorsContextProvider>
  );
}

const sortOptions = [
  {
    label: 'Youngest',
    value: 'youngest',
    field: 'age',
    direction: 'asc',
  },
  {
    label: 'Oldest',
    value: 'oldest',
    field: 'age',
    direction: 'desc',
  },
  {
    label: 'Name, A-Z',
    value: 'name-a-z',
    field: 'name',
    direction: 'asc',
  },
  {
    label: 'Name, Z-A',
    value: 'name-z-a',
    field: 'name',
    direction: 'desc',
  },
  {
    label: 'Breed, A-Z',
    value: 'breed-a-z',
    field: 'breed',
    direction: 'asc',
  },
  {
    label: 'Breed, Z-A',
    value: 'breed-z-a',
    field: 'breed',
    direction: 'desc',
  },
];

const searchErrorId = uuidv4();
const loadNextErrorId = uuidv4();
const loadPrevErrorId = uuidv4();

interface ResponseObject {
  resultIds: string[];
  next: string;
  prev: string;
  total: number;
}

function Index() {
  const searchQueryContext = useContext(SearchQueryContext);
  const errorContext = useContext(ErrorsContext);
  const { handleAddError } = errorContext;

  const [results, setResults] = useState<string[]>([]);
  const [next, setNext] = useState<string>('');
  const [prev, setPrev] = useState<string>('');
  const [totalFound, setTotalFound] = useState<number>(0);

  useEffect(() => {
    handleSearch();
  }, []);

  const { zipCodes, setZipCodes, sortBy, setSortBy, selectedBreeds } =
    searchQueryContext;

  const handleSearch = async (
    newSortBy?: SortObject,
    zipCodes?: string[],
    selectedBreeds?: string[],
  ) => {
    try {
      const resp = await searchDogs({
        breeds: selectedBreeds ?? [],
        sortBy: newSortBy ?? sortBy,
        zipCodes,
      });

      if (!resp.ok) {
        handleAddError({
          message: 'Something went wrong, try again',
          id: searchErrorId,
        });

        return;
      }

      parseResponse(await resp.json());
    } catch (error) {
      console.error(error);
      handleAddError({
        message: error,
        id: searchErrorId,
      });
    }
  };

  const handleSort = async (selectedItem: SortObject) => {
    setSortBy(selectedItem);
    await handleSearch(selectedItem, zipCodes, selectedBreeds);
  };

  const handleZipCodeFilter = async (zipCode) => {
    setZipCodes([zipCode]);
    await handleSearch(sortBy, [zipCode], selectedBreeds);
  };

  const handleResetZipCode = async () => {
    setZipCodes([]);
    await handleSearch(sortBy, [], selectedBreeds);
  };

  const handleLoadNext = async () => {
    try {
      const resp = await loadNext(next);

      if (!resp.ok) {
        handleAddError({
          message: 'Something went wrong, try again',
          id: loadNextErrorId,
        });
        return;
      }

      parseResponse(await resp.json());
    } catch (error) {
      console.error(error);
      handleAddError({
        message: error,
        id: loadNextErrorId,
      });
    }
  };

  const handlePreviousDogs = async () => {
    try {
      const resp = await loadPrev(prev);

      if (!resp.ok) {
        handleAddError({
          message: 'Something went wrong, try again',
          id: loadPrevErrorId,
        });
        return;
      }

      parseResponse(await resp.json());
    } catch (error) {
      console.error(error);
      handleAddError({
        message: error,
        id: loadPrevErrorId,
      });
    }
  };

  const parseResponse = (response: ResponseObject) => {
    const { resultIds, next: newNext, prev: newPrev, total } = response;

    setResults(resultIds);
    setNext(newNext);
    setPrev(newPrev);
    setTotalFound(total);
  };

  return (
    <Page>
      <SearchAndFilters>
        <Total>
          {totalFound} result{totalFound !== 1 && 's'} found
        </Total>

        <Filters>
          <ZipCodeFilter
            onResetZipCode={() => handleResetZipCode()}
            onFilterByZipCode={(zipcode) => handleZipCodeFilter(zipcode)}
          />

          <BreedFilter
            onSearchByBreed={(selectedBreeds) =>
              handleSearch(sortBy, zipCodes, selectedBreeds)
            }
          />

          <Dropdown
            label={`Sort by: ${sortBy.label}`}
            selectedItem={sortBy ?? null}
            onSetItem={async (newSelectedItem) => {
              await handleSort(newSelectedItem as SortObject);
            }}
            items={sortOptions}
          />
        </Filters>
      </SearchAndFilters>

      <AppliedFilters />

      <DogCardGroup itemIds={results} />

      {!!results.length && (
        <Pagination>
          <Button onClick={() => handlePreviousDogs()}>Previous</Button>

          <Button onClick={() => handleLoadNext()}>Next</Button>
        </Pagination>
      )}
    </Page>
  );
}

const Total = styled.div`
  display: flex;
  width: 100%;
`;

const Filters = styled.div`
  display: flex;
  width: 100%;
  grid-gap: 0.5rem;
  justify-content: flex-end;
`;

const SearchAndFilters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
`;
