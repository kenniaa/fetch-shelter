import * as React from 'react';
import {createContext, useState} from 'react';

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
