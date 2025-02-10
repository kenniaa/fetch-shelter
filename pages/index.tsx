import { bounceUnlessLoggedIn } from '../lib/bounce';
import Page from '../components/Page';
import searchDogs from '../rest/dogs/searchDogs';
import {useContext, useEffect, useState} from 'react';
import Button from '../components/Button';
import * as React from 'react';
import DogCardGroup from '../components/DogCardGroup';
import { FavoritesContextProvider} from '../contexts/FavoritesContext';
import Dropdown from '../components/Dropdown';
import styled from 'styled-components';
import ZipCodeFilter from '../components/feature/ZipCodeFilter';
import { SlideOutPanelContextProvider } from '../contexts/SlideOutPanelContext';
import BreedFilter from '../components/feature/BreedFilter'
import {SearchQueryContext, SearchQueryContextProvider} from '../contexts/SearchQueryContext';
import SortObject from '../lib/types';
import loadNext from '../rest/pagination/loadNext';
import loadPrev from '../rest/pagination/loadPrev';
import AppliedFilters from "../components/feature/AppliedFilters";

// export const getServerSideProps = bounceUnlessLoggedIn

export default function WrappedIndex() {
  return (
    <SearchQueryContextProvider>
      <FavoritesContextProvider>
        <SlideOutPanelContextProvider>
          <Index />
        </SlideOutPanelContextProvider>
      </FavoritesContextProvider>
    </SearchQueryContextProvider>
  )
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
  const searchQueryContext = useContext(SearchQueryContext);

  const [results, setResults] = useState<string[]>([]);
  const [next, setNext] = useState<string>('');
  const [prev, setPrev] = useState<string>('');
  const [totalFound, setTotalFound] = useState<number>(0);

  useEffect(() => {
    handleSearch();
  }, []);

  const {
    zipCodes,
    setZipCodes,
    sortBy,
    setSortBy,
    selectedBreeds
  } = searchQueryContext;

  const handleSearch = async (newSortBy?: SortObject, zipCodes?: string[], selectedBreeds?: string[]) => {
    try {
      const resp = await searchDogs({
        breeds: selectedBreeds ?? [],
        sortBy: newSortBy ?? sortBy,
        zipCodes
      })

      if (!resp.ok) {
        //TODO: handle error
        return;
      }

      parseResponse(await resp.json());
    } catch (error) {
      console.error(error);
      //TODO: handle error
    }
  }

  const handleSort = async (selectedItem: SortObject) => {
    setSortBy(selectedItem);
    await handleSearch(selectedItem, zipCodes, selectedBreeds);
  }

  const handleZipCodeFilter = async (zipCode) => {
    setZipCodes([zipCode]);
    await handleSearch(sortBy, [zipCode], selectedBreeds);
  }

  const handleResetZipCode = async () => {
    setZipCodes([]);
    await handleSearch(sortBy, [], selectedBreeds);
  }

  const handleLoadNext = async () => {
    try {
      const resp = await loadNext(next)

      if (!resp.ok) {
        //TODO: handle error
        return;
      }

     parseResponse(await resp.json());
    } catch (error) {
      console.error(error);
      //TODO: handle error
    }
  }

  const handlePreviousDogs = async () => {
    try {
      const resp = await loadPrev(prev)

      if (!resp.ok) {
        //TODO: handle error
        return;
      }

      parseResponse(await resp.json());
    } catch (error) {
      console.error(error);
      //TODO: handle error
    }
  }

  const parseResponse = (response) => {
    const {
      resultIds,
      next: newNext,
      prev: newPrev,
      total
    } = response;

    setResults(resultIds);
    setNext(newNext);
    setPrev(newPrev);
    setTotalFound(total);
  }


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
            onSearchByBreed={(selectedBreeds) => handleSearch(sortBy, zipCodes, selectedBreeds)}
          />

          <Dropdown
            label={`Sort by: ${sortBy.label}`}
            selectedItem={sortBy ?? null}
            onSetItem={async (newSelectedItem) => {
              await handleSort(newSelectedItem)
            }}
            items={sortOptions}
          />
        </Filters>
      </SearchAndFilters>

      <AppliedFilters />

      <DogCardGroup itemIds={results}/>

      {!!results.length &&
        <Pagination>
          <Button onClick={() => handlePreviousDogs()}>
            Previous
          </Button>

          <Button onClick={() => handleLoadNext()}>
            Next
          </Button>
        </Pagination>
      }
    </Page>
  )
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
