import * as React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  onClick?: () => void,
  disabled?: boolean,
  type: 'submit' | 'reset' | 'button',
  value?: string,
}

const Button = (props: ButtonProps) => {
  const {
    className,
    children,
    onClick,
    disabled,
    type,
  } = props;

  return (
    <button
      className={className}
      onClick={() => onClick && !disabled && onClick()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default styled(Button)`
  border: 1px solid transparent;
  border-radius: 4px;
  background: #6c3dcb;
  color: #FFFFFF;
  font-family: 'Fira Sans', sans-serif;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
