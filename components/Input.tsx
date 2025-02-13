import * as React from 'react';
import styled from 'styled-components';
import { Ref } from 'react';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  onInputChange: (value: string) => void;
  disabled?: boolean;
  placeholder: string;
  name: string;
  error?: string;
  value: string;
  label: string;
  type: string;
  hideLabel?: boolean;
  ref?: Ref<HTMLInputElement>;
}

const Input = (props: InputProps) => {
  const { onInputChange, disabled, error, label, hideLabel, ref } = props;

  return (
    <Wrapper>
      <Label htmlFor={label} hideLabel={hideLabel}>
        {label}
      </Label>

      <StyledInput
        ref={ref}
        id={label}
        onChange={(e) => onInputChange(e.target.value)}
        disabled={disabled}
        aria-label={label}
        {...props}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Wrapper>
  );
};

const StyledInput = styled.input`
  background: #2f2f2f;
  border: 1px solid #2f2f2f;
  border-radius: 6px;
  padding: 0.5rem 0.5rem;
  color: #ddd;
  font-size: inherit;

  &:focus {
    outline: 1px dashed #aaacd5;
    outline-offset: 3px;
  }

  &::placeholder {
    color: #888;
  }
`;

interface LabelProps {
  hideLabel?: boolean;
}

const Label = styled.label<LabelProps>`
  margin-bottom: 0.25rem;
  ${({ hideLabel }) =>
    hideLabel &&
    `
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
  color: #ff5555;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default Input;
