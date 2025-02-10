import * as React from 'react';
import styled from 'styled-components';
import { FaPaw, FaHeart } from "react-icons/fa";
import Button from './Button';
import {createPortal} from "react-dom";
import FavoritesPanel from "./feature/FavoritesPanel";
import {useContext} from "react";
import {SlideOutPanelContext} from "../contexts/SlideOutPanelContext";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
}

const Header = (props: HeaderProps) => {
  const panelContext: any = useContext(SlideOutPanelContext);
  const panelName = 'favorites-panel';

  const {
    className,
  } = props;

  const handleLogOut = async () => {

  }

  return (
    <header className={className}>
      <FavoritesPanel panelName={panelName} />

      <Logo>
        <div>
          Fetch
        </div>

        <FaPaw fill='#AAACDF'/>
      </Logo>

      <UserActions>
        <Button
          bare
          onClick={() => panelContext.showPanel(panelName)}
        >
          <FaHeart />
        </Button>

        <Button
          onClick={() => handleLogOut()}
        >
          Logout
        </Button>
      </UserActions>
    </header>
  );
}

const UserActions = styled.div`
  display: flex;
  grid-gap: 0.5rem;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 0.25rem;
`;

export default styled(Header)`
  display: flex;
  padding: 1em;
  background: #212121;
  max-height: 160px;
  flex-shrink: 0;
  justify-content: space-between;
`;
