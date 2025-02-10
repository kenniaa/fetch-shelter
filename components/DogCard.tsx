import * as React from 'react';
import styled from 'styled-components';
import { Dog } from '../lib/dataModels';
import Image from 'next/image'
import {useContext} from "react";
import {FavoritesContext} from "../contexts/FavoritesContext";
import { FaHeart, FaDog, FaMapMarkerAlt, FaRegHeart, FaBirthdayCake} from "react-icons/fa";

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

  const getAge = (age) => {
    if (age < 1) {
      return 'Under 1 year old'
    }

    if (age === 1) {
      return '1 year old'
    }

    return `${age} years old`
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
          aria-label='Bookmark item'
        >
           {isInFavorites ?
             <FaHeart fill='Red' />
             :
             <FaRegHeart />
           }
        </Favorite>
      </CardMain>

      <CardInfo>
        <Name>
          {item.name}
        </Name>

        <Details>
          <DetailBox>
            <FaBirthdayCake /> {getAge(item.age)}
          </DetailBox>

          <DetailBox>
            <FaDog /> {item.breed}
          </DetailBox>

          <DetailBox>
            <FaMapMarkerAlt /> {item.zip_code}
          </DetailBox>
        </Details>
      </CardInfo>
    </li>
  );
}

const Details = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 0.5rem;
`;

const DetailBox= styled.div`
  background: rgba(68, 68, 68, 0.65);
  color: #cccccc;
  border: 1px solid #555;
  padding: 0 4px;
  border-radius: 4px;
  width: max-content;
  display: flex;
  align-items: center;
  grid-gap: 0.25rem;
`;

const CardHeader = styled.div`
  border-radius: 4px;
  width: auto;
  padding: 0 0.25em;
  display: flex;
  align-items: baseline;
`;

const Name = styled.div`
  font-size: 20px
`;

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
  font-size: 15px;
  margin-top: 0.5rem;
`;

export default styled(DogCard)`
  background: #212121;
  padding: 0.75em;
  border-radius: 6px;
`;
