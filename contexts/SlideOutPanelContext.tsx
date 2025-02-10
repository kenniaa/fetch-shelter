import * as React from 'react';
import { createContext, Reducer, useReducer } from 'react';

export interface ContextProps {
  showState: Record<string, boolean>,
  hidePanel: (name: string) => void,
  showPanel: (name: string) => void,
  isPanelShowing?: (name: string) => boolean
}

export const SlideOutPanelContext = createContext<ContextProps>({
  showState: {},
  hidePanel: (_) => {},
  showPanel: (_) => {},
  isPanelShowing: (name) => false,
});

interface SlideOutPanelContextProps {
  children: any
}

export const SlideOutPanelContextProvider = (props: SlideOutPanelContextProps) => {
  const {
    children
  } = props;

  const [showState, setShowState] = React.useState({});

  const showPanel = (name) => {
    if (showState && showState[name]) {
      return;
    }

    const newShowState = {};
    newShowState[name] = true;

    document.body.style.overflow = 'hidden';
    document.body.querySelector('#__next').ariaHidden = true;
    document.body.querySelector('#__next').ariaDisabled = true;

    setShowState(newShowState);
  }

  const hidePanel = (name) => {
    if (!name || (showState && !showState[name])) {
      return;
    }

    const newShowState = { ...showState };
    newShowState[name] = false;

    document.body.style.overflow = 'initial';
    document.body.querySelector('#__next').ariaHidden = false;
    document.body.querySelector('#__next').ariaDisabled = false;

    setShowState(newShowState);
  }

  const isPanelShowing = (name) => {
    return showState[name];
  }

  const value = {
    setShowState,
    showPanel,
    hidePanel,
    showState,
    isPanelShowing,
  }

  return (
    <SlideOutPanelContext.Provider value={value}>
      {children}
    </SlideOutPanelContext.Provider>
  )
}
