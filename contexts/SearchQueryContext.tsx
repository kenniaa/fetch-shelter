import * as React from 'react';
import {createContext, useState} from 'react';
import SortObject from "../lib/types";

interface ContextProps {
  setSelectedBreeds: (value: string[]) => void,
  setZipCodes: (value: string[]) => void,
  setSortBy: (value: SortObject) => void,
  setName: (value: string) => void,
  selectedBreeds: string[],
  zipCodes: string[],
  sortBy: SortObject,
}

export const SearchQueryContext = createContext<ContextProps>({
  setSelectedBreeds: () => {},
  setZipCodes: () => {},
  setSortBy: () => {},
  selectedBreeds: [],
  zipCodes: [],
  sortBy: {},
});

interface SearchQueryContextProps {
  children: any
}

export const SearchQueryContextProvider = (props: SearchQueryContextProps) => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortObject>({
    label: 'Name, A-Z',
    value: 'name-a-z',
    field: 'name',
    direction: 'asc',
    icon: 'fas fa-sm fa-sort-alpha-down'
  });

  const {
    children
  } = props;

  const value = {
    selectedBreeds,
    zipCodes,
    sortBy,
    setSelectedBreeds,
    setZipCodes,
    setSortBy,
  }

  return (
    <SearchQueryContext.Provider value={value}>
      {children}
    </SearchQueryContext.Provider>
  )
}
