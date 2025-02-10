import { useCallback, useEffect } from 'react';

interface OutsideClickProps {
  ref?: any,
  callback: () => void
  shouldTriggerCallback: boolean
}

export const useOutsideClick = (props: OutsideClickProps) => {
  const {
    ref,
    callback,
    shouldTriggerCallback
  } = props;

  const handleClick = useCallback(
    (event: Event) => {
      if (!shouldTriggerCallback) {
        return;
      }

      if (ref?.current && !ref?.current?.contains(event?.target) && shouldTriggerCallback) {
        callback()
      }
    },
    [callback, shouldTriggerCallback, ref]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [handleClick])
}
