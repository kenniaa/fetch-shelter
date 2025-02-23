import * as React from 'react';
import styled from 'styled-components';
import { Dog } from '../lib/dataModels';
import Image from 'next/image';
import { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import {
  FaHeart,
  FaDog,
  FaMapMarkerAlt,
  FaRegHeart,
  FaBirthdayCake,
} from 'react-icons/fa';
import { SlideOutPanelContext } from '../contexts/SlideOutPanelContext';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  item: Dog;
  noEditing?: boolean;
}

const panelName = 'favorites-panel';

const DogCard = (props: CardProps) => {
  const favoritesContext = useContext(FavoritesContext);
  const panelContext = useContext(SlideOutPanelContext);

  const { favorites, setFavorites } = favoritesContext;

  const { className, item, noEditing } = props;

  const isInFavorites = favorites.includes(item.id);

  const handleFavoriteClick = () => {
    if (favorites.includes(item.id)) {
      setFavorites(
        favorites.filter((favorite: string) => favorite !== item.id),
      );
      return;
    }

    setFavorites([...favorites, item.id]);
    panelContext.showPanel(panelName);
  };

  const getAge = (age) => {
    if (age < 1) {
      return 'Under 1 year old';
    }

    if (age === 1) {
      return '1 year old';
    }

    return `${age} years old`;
  };

  return (
    <li className={className}>
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

        {!noEditing && (
          <Favorite
            onClick={() => handleFavoriteClick()}
            isInFavorites={isInFavorites}
            aria-label='Bookmark item'
          >
            {isInFavorites ? <FaHeart fill='Red' /> : <FaRegHeart />}
          </Favorite>
        )}
      </CardMain>

      <CardInfo>
        <Name>{item.name}</Name>

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
};

const Details = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 0.5rem;
`;

const DetailBox = styled.div`
  background: rgba(68, 68, 68, 0.65);
  color: #cccccc;
  border: 1px solid #555;
  padding: 4px;
  border-radius: 4px;
  width: auto;
  display: flex;
  align-items: center;
  grid-gap: 0.25rem;
`;

const Name = styled.div`
  font-size: 20px;
`;

interface FavoriteProps {
  isInFavorites?: boolean;
  onClick?: React.MouseEventHandler;
}

const Favorite = styled.button<FavoriteProps>`
  border-radius: 99px;
  height: 2rem;
  width: 2rem;
  padding: 0.5rem;
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
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
  padding: 0.75rem;
  border-radius: 6px;
`;
