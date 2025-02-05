import * as React from 'react';
import styled from 'styled-components';
import { ChangeEvent, Ref } from 'react';

interface InputProps extends React.HTMLAttributes<HTMLElement> {
  onInputChange: (value: string) => void,
  disabled?: boolean,
  placeholder: string,
  name: string,
  error?: string,
  value: string,
  label: string,
  type: string,
  hideLabel?: boolean,
  ref?: Ref<HTMLInputElement>
}

const Input = (props: InputProps)=> {
  const {
    onInputChange,
    disabled,
    placeholder,
    name,
    error,
    value,
    label,
    type,
    hideLabel,
    ref
  } = props;

  return (
    <Wrapper>
      <Label
        htmlFor={label}
        hideLabel={hideLabel}
      >
        {label}
      </Label>

      <input
        ref={ref}
        id={label}
        onChange={(e) => onInputChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        name={name}
        value={value}
        type={type}
        aria-label={label}
        {...props}
      />

      {error &&
        <ErrorMessage>
          {error}
        </ErrorMessage>
      }
    </Wrapper>
  )
}

interface LabelProps {
  hideLabel?: boolean
}

const Label = styled.label<LabelProps>`
    ${({ hideLabel }) => hideLabel && `
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    `}
`;

const ErrorMessage = styled.div`
  font-size: 0.8em;
  text-align: left;
  color: red;
`;

const Wrapper = styled.div`
  border-radius: 6px;
  display: flex;
  flex-direction: column;
`;

export default Input;
