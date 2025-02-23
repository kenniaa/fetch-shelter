import Button from '../../components/Button';
import Input from '../../components/Input';
import { FormEvent, useContext } from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import loginUser from '../../rest/auth/loginUser';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';
import Page from '../../components/Page';
import {
  ErrorsContext,
  ErrorsContextProvider,
} from '../../contexts/ErrorContext';
import { v4 as uuidv4 } from 'uuid';
import { bounceUnlessLoggedOut } from '../../lib/bounce';

export const getServerSideProps = bounceUnlessLoggedOut;

export default function WrappedLogin() {
  return (
    <ErrorsContextProvider>
      <Login />
    </ErrorsContextProvider>
  );
}

const loginErrorId = uuidv4();

function Login() {
  const emailInput = useInput('');
  const nameInput = useInput('');
  const router = useRouter();
  const errorContext = useContext(ErrorsContext);
  const { handleAddError } = errorContext;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const resp = await loginUser(emailInput.value, nameInput.value);

      if (!resp.ok) {
        handleAddError({
          message: 'Something went wrong, try again',
          id: loginErrorId,
        });

        return;
      }

      setCookie(null, 'isLoggedIn', 'true', {
        maxAge: 36000,
        path: '/',
      });

      await router.push('/');
    } catch (error) {
      console.error(error);

      handleAddError({
        message: error,
        id: loginErrorId,
      });
    }
  };

  return (
    <Page>
      <Form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <Input
          type='text'
          name='name'
          label='Name'
          placeholder='Enter your name'
          {...nameInput}
        />

        <Input
          type='email'
          name='email'
          label='Email'
          placeholder='Enter your email'
          {...emailInput}
        />

        <div>
          <Button>Submit</Button>
        </div>
      </Form>
    </Page>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  grid-gap: 1em;
`;
