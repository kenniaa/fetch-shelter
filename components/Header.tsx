import * as React from 'react';
import styled from 'styled-components';
import { FaPaw, FaHeart } from 'react-icons/fa';
import Button from './Button';
import FavoritesPanel from './feature/FavoritesPanel';
import { useContext, useEffect, useState } from 'react';
import { SlideOutPanelContext } from '../contexts/SlideOutPanelContext';
import { destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import logoutUser from '../rest/auth/logoutUser';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = (props: HeaderProps) => {
  const router = useRouter();
  const panelContext = useContext(SlideOutPanelContext);
  const panelName = 'favorites-panel';
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { className } = props;

  useEffect(() => {
    const { isLoggedIn: sessionToken } = parseCookies();
    setIsLoggedIn(!!sessionToken);
  }, []);

  const handleLogOut = async () => {
    try {
      const resp = await logoutUser();

      if (!resp.ok) {
        //TODO: handle error
      }

      destroyCookie(null, 'isLoggedIn');

      await router.push('/login');
    } catch (error) {
      console.error(error);
      //TODO: handle error
    }
  };

  return (
    <header className={className}>
      <FavoritesPanel panelName={panelName} />

      <Logo>
        <div>Fetch</div>

        <FaPaw fill='#AAACDF' />
      </Logo>

      {isLoggedIn && (
        <UserActions>
          <Button bare onClick={() => panelContext.showPanel(panelName)}>
            <FaHeart />
          </Button>

          <Button onClick={() => handleLogOut()}>Logout</Button>
        </UserActions>
      )}
    </header>
  );
};

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
  padding: 1rem;
  background: #212121;
  max-height: 160px;
  flex-shrink: 0;
  justify-content: space-between;
`;
