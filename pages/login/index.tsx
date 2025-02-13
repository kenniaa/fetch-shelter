import Button from '../../components/Button';
import Input from '../../components/Input';
import { FormEvent } from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import loginUser from '../../rest/auth/loginUser';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';
import Page from '../../components/Page';

export default function Login() {
  const emailInput = useInput('');
  const nameInput = useInput('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const resp = await loginUser(emailInput.value, nameInput.value);

      if (!resp.ok) {
        //TODO: handle error
      }

      setCookie(null, 'isLoggedIn', 'true', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      await router.push('/');
    } catch (error) {
      console.error(error);
      //TODO: handle error
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
