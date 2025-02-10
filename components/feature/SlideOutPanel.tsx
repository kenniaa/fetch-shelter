import * as React from 'react'
import { useContext, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { FaTimes } from "react-icons/fa";


import {SlideOutPanelContext} from "../../contexts/SlideOutPanelContext";
import {useFocusTrap} from "../../hooks/useFocusTrap";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import {useCloseEscape} from "../../hooks/useCloseEscape";

type Props = {
  children: React.ReactNode
  panelName: string,
  onClose?: () => void,
  title?: string,
}

const SlideOutPanel = (props: Props) => {
  const panelContext: any = useContext(SlideOutPanelContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    panelName,
    children,
    onClose,
    title,
  } = props;

  const panelRef = useFocusTrap(isOpen);

  useOutsideClick({
    ref: panelRef,
    callback: () => closePanel(),
    shouldTriggerCallback: isOpen,
  });

  useEffect(() => {
    if (panelContext?.showState[panelName] === isOpen) {
      return;
    }

    setIsOpen(panelContext?.showState[panelName]);

  }, [panelContext?.showState[panelName]]);


  useCloseEscape(() => closePanel())

  const closePanel = (e?) => {
    if (e) {
      e?.stopPropagation();
    }

    panelContext?.hidePanel(panelName);
    onClose && onClose();
  }

  return isOpen ? ReactDOM.createPortal(
      <Overlay>
        <StyledPanel
          aria-modal='true'
          aria-labelledby='panelTitle'
          aria-hidden='false'
          ref={panelRef}
          aria-describedby='panel_description'
        >
          <HiddenUI id='panel_description'>
            This is a slide out panel which overlays the main content of the page.
            Pressing the close panel button at the top of the panel will bring
            you back to where you were on the page before.
          </HiddenUI>

          <Header>
            <Title id='panelTitle'>
              {title}
            </Title>

            <CloseButton
              onClick={(e) => closePanel(e)}
              aria-label='Close panel'
            >
              <FaTimes />
            </CloseButton>
          </Header>

          <main>{children}</main>
        </StyledPanel>
      </Overlay>
      , document.body)
    :
    null;
}

interface HeaderProps {
  hasBackButton?: boolean
}

const Header = styled.header<HeaderProps>`
  display: grid;
  grid-template-columns: 1fr 2em;
  align-items: center;
  grid-gap: 1em;
  margin-bottom: 1em;
`;

const Title = styled.h1`
  font-size: 1.34em;
  font-weight: 400;
  word-break: break-word;
  margin: 0;
`;

const CloseButton = styled.button`
  justify-self: flex-end;
  box-shadow: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: unset;
  padding: unset;
  font: unset;
  cursor: pointer;
  color: inherit;
  width: 1.5em;
  height: 1.5em;
  border-radius: 99em;
  border-color: transparent;
  font-size: 1.4em;

  &:focus, &:hover {
    outline: 1px dashed #aaacd5;
    outline-offset: 3px;
  }
`;

const BackButton = styled(CloseButton)`
  justify-self: flex-start;
`;

const HiddenUI = styled.div`
  position:absolute;
  left:-10000px;
  top:auto;
  width:1px;
  height:1px;
  overflow:hidden;
`;

const StyledPanel = styled.div`
    background: #181818;
    position: absolute;
    right: 0;
    height: 100%;
    overflow: auto;
    width: 470px;
    padding: 1em;
    cursor: auto;
    transition: width 0.3s ease-out;

    @media screen and (min-width: 1200px) {
      width: 500px;
    }

    @media screen and (min-width: 1440px) {
      width: 600px;
    }

    @media screen and (max-width: 48em) {
      width: 420px;
    }

    @media screen and (max-width: 515px) {
      width: calc(100% - 3em);
      padding: 1em 1.3em;
    }

    @media screen and (max-width: 425px) {
      padding: 1em 1em;
    }

    @media screen and (max-width: 375px) {
      width: calc(100% - 2em);
    }

    @media screen and (max-width: 320px) {
      padding: 0.75em;
    }
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(41 41 41 / 70%);
  z-index: 8;
  cursor: pointer;
`;

export default SlideOutPanel;
