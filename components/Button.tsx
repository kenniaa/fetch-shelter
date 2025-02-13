import * as React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  value?: string;
  bare?: boolean;
  primary?: boolean;
  secondary?: boolean;
  margin?: string;
}

const Button = (props: ButtonProps) => {
  const { className, children, onClick, disabled } = props;

  return (
    <button
      className={className}
      onClick={(event) => onClick && !disabled && onClick(event)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default styled(Button)`
  border: 1px solid transparent;
  background: #2f2f2f;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.5rem;
  font-size: inherit;

  ${({ margin }) =>
    margin &&
    `
    margin: ${margin};
  `};

  ${({ primary }) =>
    primary &&
    `
    background: #413d87;
  `};

  ${({ bare }) =>
    bare &&
    `
    background: transparent;
    color: inherit;
    padding: 4px;
  `};

  &:focus {
    outline: 1px dashed #aaacd5;
    outline-offset: 3px;
  }
`;
