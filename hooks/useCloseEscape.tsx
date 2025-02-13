import { useCallback, useEffect } from 'react';

export const useCloseEscape = (callback: () => void) => {
  const escapeCloseModal = useCallback(
    (event: KeyboardEvent) => {
      if (event?.key === 'Escape') {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    document.addEventListener('keydown', escapeCloseModal);

    return () => {
      document.removeEventListener('keydown', escapeCloseModal);
    };
  }, [escapeCloseModal]);
};
