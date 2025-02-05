import * as React from 'react';
import {createContext, Reducer, useContext, useReducer, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import { MoneyFactory } from '~/lib/types/money';

import DefaultPhase from '~/components/feature/crates/v2/Phases/legacy/DefaultPhase';
import getCrate from '~/rest/crates/getCrate';
import getPhases from '~/rest/crates/getPhases';

import { ProfileContext } from '~/components/ProfileContext';
import getPhaseMembers from "~/rest/phase/getPhaseMembers";

interface ContextProps {
  setFavorites: (favorites: string[]) => void
  favorites: any,
}

export const FavoritesContext = createContext<ContextProps>({
  setFavorites: () => {},
  favorites: []
});

interface FavoritesContextProps {
  children: any
}

export const FavoritesContextProvider = (props: FavoritesContextProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const {
    children
  } = props;

  const value = {
    setFavorites,
    favorites
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
