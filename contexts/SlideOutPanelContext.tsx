import * as React from 'react';
import { createContext, ReactNode } from 'react';

export interface ContextProps {
  showState: Record<string, boolean>;
  hidePanel: (name: string) => void;
  showPanel: (name: string) => void;
  isPanelShowing?: (name: string) => boolean;
}

export const SlideOutPanelContext = createContext<ContextProps>({
  showState: {},
  hidePanel: (_) => {},
  showPanel: (_) => {},
  isPanelShowing: (_) => false,
});

interface SlideOutPanelContextProps {
  children: ReactNode;
}

export const SlideOutPanelContextProvider = (
  props: SlideOutPanelContextProps,
) => {
  const { children } = props;

  const [showState, setShowState] = React.useState({});

  const showPanel = (name: string) => {
    if (showState && showState[name]) {
      return;
    }

    const newShowState = {};
    newShowState[name] = true;

    document.body.style.overflow = 'hidden';

    setShowState(newShowState);
  };

  const hidePanel = (name: string) => {
    if (!name || (showState && !showState[name])) {
      return;
    }

    const newShowState = { ...showState };
    newShowState[name] = false;

    document.body.style.overflow = 'initial';

    setShowState(newShowState);
  };

  const isPanelShowing = (name) => {
    return showState[name];
  };

  const value = {
    setShowState,
    showPanel,
    hidePanel,
    showState,
    isPanelShowing,
  };

  return (
    <SlideOutPanelContext.Provider value={value}>
      {children}
    </SlideOutPanelContext.Provider>
  );
};
