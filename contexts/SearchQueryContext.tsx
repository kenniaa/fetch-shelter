import * as React from 'react';
import { createContext, ReactNode, useState } from 'react';
import SortObject from '../lib/types';

interface ContextProps {
  setSelectedBreeds: (value: string[]) => void;
  setZipCodes: (value: string[]) => void;
  setSortBy: (value: SortObject) => void;
  selectedBreeds: string[];
  zipCodes: string[];
  sortBy: SortObject;
}

export const SearchQueryContext = createContext<ContextProps>({
  setSelectedBreeds: () => {},
  setZipCodes: () => {},
  setSortBy: () => {},
  selectedBreeds: [],
  zipCodes: [],
  sortBy: {
    label: '',
    value: '',
    field: '',
    direction: '',
  },
});

interface SearchQueryContextProps {
  children: ReactNode;
}

export const SearchQueryContextProvider = (props: SearchQueryContextProps) => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortObject>({
    label: 'Name, A-Z',
    value: 'name-a-z',
    field: 'name',
    direction: 'asc',
  });

  const { children } = props;

  const value = {
    selectedBreeds,
    zipCodes,
    sortBy,
    setSelectedBreeds,
    setZipCodes,
    setSortBy,
  };

  return (
    <SearchQueryContext.Provider value={value}>
      {children}
    </SearchQueryContext.Provider>
  );
};
