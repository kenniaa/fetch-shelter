import * as React from 'react';
import SlideOutPanel from './SlideOutPanel';
import { SlideOutPanelContext } from '../../contexts/SlideOutPanelContext';
import { useContext, useState } from 'react';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import DogCardGroup from '../DogCardGroup';
import Button from '../Button';
import createMatch from '../../rest/dogs/createMatch';
import styled from 'styled-components';

interface FavoritesPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  panelName: string;
}

const FavoritesPanel = (props: FavoritesPanelProps) => {
  const panelContext = useContext(SlideOutPanelContext);
  const favoritesContext = useContext(FavoritesContext);
  const [match, setMatch] = useState<string>('');

  const { favorites } = favoritesContext;

  const { panelName } = props;

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
  };

  return (
    <SlideOutPanel
      title='Favorite dogs'
      panelName={panelName}
      onClose={() => {
        panelContext?.hidePanel(panelName);
      }}
    >
      {!!favorites?.length ? (
        <>
          <div>
            Add more favorites or click &quot;Generate Match&quot; to see the
            perfect dog for you!
          </div>

          <Center>
            <Button primary onClick={() => handleMatch()}>
              Match me with a dog
            </Button>
          </Center>

          {match && (
            <Match>
              Meet your fur-ever dog:
              <DogCardGroup noEditing itemIds={[match]} />
            </Match>
          )}

          <DogCardGroup smallCards itemIds={favorites} />
        </>
      ) : (
        <div>
          Go to the search page and favorite some dogs, then come here to
          generate a match!
        </div>
      )}

      <Center>
        <Button onClick={() => panelContext.hidePanel(panelName)}>
          Go back to search page
        </Button>
      </Center>
    </SlideOutPanel>
  );
};

const Match = styled.div`
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #555;
`;

const Center = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

export default FavoritesPanel;
