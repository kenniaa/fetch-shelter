import * as React from 'react';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import getDogInfo from '../rest/dogs/getDogInfo';
import DogCard from './DogCard';
import { Dog } from '../lib/dataModels';

interface CardGroupProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode,
  itemIds: string[],
  column?: boolean
}

const DogCardGroup = (props: CardGroupProps) => {
  const [items, setItems] = useState<Dog[]>([]);

  const {
    className,
    itemIds
  } = props;

  useEffect(() => {
    fetchDogs()
  }, [itemIds]);

  const fetchDogs = async () => {
    try {
      const resp = await getDogInfo(itemIds);

      if (!resp.ok) {
        //TODO: handle error
        return;
      }

      const dogs = await resp.json();
      setItems(dogs);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <ul
      className={className}
    >
      {items.map((item, index) => (
        <DogCard key={item.id} item={item}/>
      ))}
    </ul>
  );
}

export default styled(DogCardGroup)`
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 1rem;

  ${({ column }) => column && `
    grid-template-columns: 1fr;
  `};
`;
