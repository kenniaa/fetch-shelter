import * as React from 'react';
import SlideOutPanel from "./SlideOutPanel";
import {SlideOutPanelContext} from "../../contexts/SlideOutPanelContext";
import {useContext, useState} from "react";
import {FavoritesContext} from "../../contexts/FavoritesContext";
import DogCardGroup from "../DogCardGroup";
import Button from "../Button";
import createMatch from "../../rest/dogs/createMatch";

interface FavoritesPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  panelName: string
}

const FavoritesPanel = (props: FavoritesPanelProps) => {
  const panelContext: any = useContext(SlideOutPanelContext);
  const favoritesContext = useContext(FavoritesContext);
  const [match, setMatch] = useState<string>('');

  const {
    favorites
  } = favoritesContext;

  const {
    panelName
  } = props;

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

  return (
    <SlideOutPanel
      title='Favorite dogs'
      panelName={panelName}
      onClose={() => {
        panelContext?.hidePanel(panelName);
      }}
    >
      FAVORITES:
      <DogCardGroup
        itemIds={favorites}
      />

      <Button
        primary
        onClick={() => handleMatch()}
      >
        Match me with a dog
      </Button>

      {match &&
        <DogCardGroup itemIds={[match]}/>
      }
    </SlideOutPanel>
  );
};

export default FavoritesPanel;
