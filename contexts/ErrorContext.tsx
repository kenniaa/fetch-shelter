import * as React from 'react';
import { createContext, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorObject {
  message: string;
  id: string;
}

interface ContextProps {
  handleAddError: (error: ErrorObject) => void;
  handleClearError: (errorId: string) => void;
  ErrorNotification: () => React.JSX.Element | null;
}

export const ErrorsContext = createContext<ContextProps>({
  handleAddError: (_) => {},
  handleClearError: (_) => {},
  ErrorNotification: () => null,
});

interface ErrorsContextProps {
  children: ReactNode;
}

export const ErrorsContextProvider = (props: ErrorsContextProps) => {
  const [errors, setErrors] = useState<ErrorObject[] | []>([]);

  const { children } = props;

  const handleAddError = (error: ErrorObject) => {
    setErrors([...errors, error]);

    setTimeout(() => {
      setErrors(errors?.filter((e: ErrorObject) => e.id !== error.id));
    }, 3000);
  };

  const handleClearError = (errorId: string) => {
    setErrors(errors?.filter((error: ErrorObject) => error.id !== errorId));
  };

  const ErrorNotification = () => {
    if (!errors.length) {
      return null;
    }

    return (
      <>
        {errors?.map((error: ErrorObject) => (
          <Notification key={error.id}>
            <FaExclamationTriangle />

            {error.message}
          </Notification>
        ))}
      </>
    );
  };

  const value = {
    handleAddError,
    handleClearError,
    ErrorNotification,
  };

  return (
    <ErrorsContext.Provider value={value}>{children}</ErrorsContext.Provider>
  );
};

const Notification = styled.div`
  background: rgba(177, 36, 55, 0.7);
  color: white;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  grid-gap: 0.5rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
`;
