import * as React from 'react';
import SlideOutPanel from './SlideOutPanel';
import { SlideOutPanelContext } from '../../contexts/SlideOutPanelContext';
import { useContext, useState } from 'react';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import DogCardGroup from '../DogCardGroup';
import Button from '../Button';
import createMatch from '../../rest/dogs/createMatch';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { ErrorsContext } from '../../contexts/ErrorContext';

interface FavoritesPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  panelName: string;
}

const matchErrorId = uuidv4();

const FavoritesPanel = (props: FavoritesPanelProps) => {
  const panelContext = useContext(SlideOutPanelContext);
  const favoritesContext = useContext(FavoritesContext);
  const [match, setMatch] = useState<string>('');
  const errorContext = useContext(ErrorsContext);
  const { handleAddError } = errorContext;
  const { favorites } = favoritesContext;

  const { panelName } = props;

  const handleMatch = async () => {
    try {
      const resp = await createMatch(favorites);

      if (!resp.ok) {
        handleAddError({
          message: 'Something went wrong, try again',
          id: matchErrorId,
        });

        return;
      }

      const respObj = await resp.json();
      setMatch(respObj.match);
    } catch (error) {
      console.error(error);
      handleAddError({
        message: error,
        id: matchErrorId,
      });
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
