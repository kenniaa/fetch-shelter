import Button from '../../components/Button';
import Input from '../../components/Input';
import { FormEvent } from 'react';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import loginUser from '../../rest/auth/loginUser';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router: any = useRouter();

  const emailInput = useInput('');
  const nameInput = useInput('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const resp = await loginUser(emailInput.value, nameInput.value);

      if (!resp.ok) {
        //TODO: handle error
      }

      router.refresh();
      router.push('/')
    } catch (error) {
      console.error(error);
      //TODO: handle error
    }
  }

  return (
    <Center>
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
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

        <Button type='submit'>Submit</Button>
      </form>
    </Center>
  )
}

const Center = styled.div`
  width: 100%;
  max-width: 1240px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;
