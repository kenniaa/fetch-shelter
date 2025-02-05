import * as React from 'react';
import styled from 'styled-components';
import { Dog } from '../lib/dataModels';
import Image from 'next/image'
import {useContext} from "react";
import {FavoritesContext} from "../contexts/FavoritesContext";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  item: Dog
}

const DogCard = (props: CardProps) => {
  const favoritesContext = useContext(FavoritesContext);

  const {
    favorites,
    setFavorites
  } = favoritesContext;

  const {
    className,
    item,
  } = props;
  
  const isInFavorites= favorites.includes(item.id);

  const handleFavoriteClick = () => {
    if (favorites.includes(item.id)) {
      setFavorites(favorites.filter(favorite => favorite !== item.id));
      return;
    }

    setFavorites([...favorites, item.id]);
  }

  return (
    <li
      className={className}
    >
     <CardMain>
       <Image
         width={500}
         height={500}
         sizes='100vw'
         style={{
           width: '100%',
           height: '300px',
           maxHeight: '300px',
           objectFit: 'cover',
           borderRadius: '6px',
         }}
         src={item.img}
         alt={`Picture of ${item.name}`}
       />

       <Favorite
         onClick={() => handleFavoriteClick()}
         isInFavorites={isInFavorites}
         // aria-hidden={ariaHidden}
         // tabIndex={tabIndex}
         aria-label='Bookmark item'
       >
         {isInFavorites ?
           <FaBookmark fill='Red' />
           :
           <FaRegBookmark />
         }
       </Favorite>
     </CardMain>

      <CardInfo>
        {item.name}
        {item.age}
        <br />
        {item.breed}
        {item.zip_code}
      </CardInfo>
    </li>
  );
}

interface FavoriteProps {
  isInFavorites?: boolean,
  onClick?: any
}

const Favorite = styled.button<FavoriteProps>`
  border-radius: 99px;
  height: 2em;
  width: 2em;
  padding: 0.5em;
  justify-content: center;
  align-items: center;
  align-self: center;
  cursor: pointer;
  position: absolute;
  top: 0.7em;
  right: 0.7em;
  z-index: 4;
  box-shadow: none;
  border: none;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1.275);
  transition-duration: 400ms;
`;

const CardMain = styled.div`
  display: flex;
  position: relative;
  grid-area: cardmain;
`;

const CardInfo = styled.div`
  grid-area: cardinfo;
`;

export default styled(DogCard)`
  background: #f0f0f0;
  padding: 0.75em;
  border-radius: 6px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
  grid-auto-flow: dense;
  grid-template-areas:
    'cardmain'
    'cardinfo';
`;
