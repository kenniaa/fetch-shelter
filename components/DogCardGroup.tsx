import * as React from 'react';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import getDogInfo from '../rest/dogs/getDogInfo';
import DogCard from './DogCard';
import { Dog } from '../lib/dataModels';
import { ErrorsContext } from '../contexts/ErrorContext';
import { v4 as uuidv4 } from 'uuid';

interface CardGroupProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  itemIds: string[];
  column?: boolean;
  smallCards?: boolean;
  noEditing?: boolean;
}

const fetchErrorId = uuidv4();

const DogCardGroup = (props: CardGroupProps) => {
  const [items, setItems] = useState<Dog[]>([]);
  const errorContext = useContext(ErrorsContext);
  const { handleAddError } = errorContext;

  const { className, itemIds, noEditing } = props;

  useEffect(() => {
    fetchDogs();
  }, [itemIds]);

  const fetchDogs = async () => {
    try {
      const resp = await getDogInfo(itemIds);

      if (!resp.ok) {
        handleAddError({
          message: 'Something went wrong, try again',
          id: fetchErrorId,
        });
        return;
      }

      const dogs = await resp.json();
      setItems(dogs);
    } catch (error) {
      console.error(error);
      handleAddError({
        message: error,
        id: fetchErrorId,
      });
    }
  };

  return (
    <ul className={className}>
      {items.map((item) => (
        <DogCard noEditing={noEditing} key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default styled(DogCardGroup)`
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(props) => (props.smallCards ? '150px' : '350px')}, 1fr)
  );
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 1rem;
  margin-top: 1rem;

  ${({ column }) =>
    column &&
    `
    grid-template-columns: 1fr;
  `};
`;
