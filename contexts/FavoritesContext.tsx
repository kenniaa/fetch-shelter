import * as React from 'react';
import { createContext, ReactNode, useState } from 'react';

interface ContextProps {
  setFavorites: (favorites: string[]) => void;
  favorites: string[];
}

export const FavoritesContext = createContext<ContextProps>({
  setFavorites: () => {},
  favorites: [],
});

interface FavoritesContextProps {
  children: ReactNode;
}

export const FavoritesContextProvider = (props: FavoritesContextProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const { children } = props;

  const value = {
    setFavorites,
    favorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
