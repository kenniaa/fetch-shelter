import * as React from 'react'
import { useEffect, useRef } from 'react'

export const useFocusTrap = <Element extends HTMLElement = HTMLDivElement>(stateOfComponent: boolean): React.RefObject<Element> => {
  const ref = useRef<Element>(null)

  useEffect(() => {
    if (ref.current) {
      return setUpFocusTrap(ref.current as HTMLElement)
    }
  }, [stateOfComponent])

  return ref
}

const FOCUSABLE_ELEMENTS = [
  'input:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  '[href]:not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
]

function isVisible(element: HTMLElement) {
  return Boolean(
    element.offsetWidth ||
    element.offsetHeight ||
    element.getClientRects().length
  )
}

function isTabKeyPressed(event: KeyboardEvent) {
  return event.key === 'Tab'
}

function getFocusableElements(trappedElement: HTMLElement): HTMLElement[] {
  const focusableElements = Array.prototype.slice.call(
    trappedElement.querySelectorAll(FOCUSABLE_ELEMENTS.join())
  )
  const visibleFocusableElements = focusableElements.filter(isVisible)

  if (visibleFocusableElements.length === 0) {
    throw new TypeError(
      'There are no focusable elements in the trapped element provided'
    )
  }

  return visibleFocusableElements
}

function setUpFocusTrap(trappedElement: HTMLElement): (element?: HTMLElement, element2?: HTMLElement) => void {
  const lastActiveElement = document.activeElement as HTMLElement
  const focusableElements = getFocusableElements(trappedElement)
  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]
  const keyDownEventHandler = getKeyDownEventHandler(
    firstFocusableElement,
    lastFocusableElement
  )

  // Engage focus trap.
  trappedElement.addEventListener('keydown', keyDownEventHandler)

  if (firstFocusableElement) {
    firstFocusableElement.focus()
  }

  // Return a callback that allows to disengage the focus trap
  // and also restore the focus back to the appropriate element in the page.
  return getDisengageFocusTrapCallback(
    trappedElement,
    keyDownEventHandler,
    lastActiveElement
  )
}

function getKeyDownEventHandler(firstElement: HTMLElement, lastElement: HTMLElement) {
  return function (event: KeyboardEvent) {
    if (!isTabKeyPressed(event)) return

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }
}

function getDisengageFocusTrapCallback(trappedElement: HTMLElement, keyDownEventHandler: (event: KeyboardEvent) => void, lastActiveElement: HTMLElement) {
  return function () {
    trappedElement.removeEventListener('keydown', keyDownEventHandler)

    if (lastActiveElement) {
      lastActiveElement.focus()
    }
  }
}
