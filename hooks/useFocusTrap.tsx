import { RefObject, useEffect, useRef } from 'react';

export const useFocusTrap = (
  stateOfComponent: boolean,
): RefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      return setUpFocusTrap(ref.current);
    }
  }, [stateOfComponent]);

  return ref || null;
};

const FOCUSABLE_ELEMENTS = [
  'input:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  '[href]:not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
];

function isVisible(element: HTMLDivElement) {
  return Boolean(
    element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length,
  );
}

function isTabKeyPressed(event: KeyboardEvent) {
  return event.key === 'Tab';
}

function getFocusableElements(
  trappedElement: HTMLDivElement,
): HTMLDivElement[] {
  const focusableElements = Array.prototype.slice.call(
    trappedElement.querySelectorAll(FOCUSABLE_ELEMENTS.join()),
  );
  const visibleFocusableElements = focusableElements.filter(isVisible);

  if (visibleFocusableElements.length === 0) {
    throw new TypeError(
      'There are no focusable elements in the trapped element provided',
    );
  }

  return visibleFocusableElements;
}

function setUpFocusTrap(
  trappedElement: HTMLDivElement,
): (element?: HTMLDivElement, element2?: HTMLDivElement) => void {
  const lastActiveElement = document.activeElement as HTMLDivElement;
  const focusableElements = getFocusableElements(trappedElement);
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];
  const keyDownEventHandler = getKeyDownEventHandler(
    firstFocusableElement,
    lastFocusableElement,
  );

  // Engage focus trap.
  trappedElement.addEventListener('keydown', keyDownEventHandler);

  if (firstFocusableElement) {
    firstFocusableElement.focus();
  }

  // Return a callback that allows to disengage the focus trap
  // and also restore the focus back to the appropriate element in the page.
  return getDisengageFocusTrapCallback(
    trappedElement,
    keyDownEventHandler,
    lastActiveElement,
  );
}

function getKeyDownEventHandler(
  firstElement: HTMLDivElement,
  lastElement: HTMLDivElement,
) {
  return function (event: KeyboardEvent) {
    if (!isTabKeyPressed(event)) return;

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };
}

function getDisengageFocusTrapCallback(
  trappedElement: HTMLDivElement,
  keyDownEventHandler: (event: KeyboardEvent) => void,
  lastActiveElement: HTMLDivElement,
) {
  return function () {
    trappedElement.removeEventListener('keydown', keyDownEventHandler);

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  };
}
