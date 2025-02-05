import fetch from 'isomorphic-unfetch';

export default async function loginUser(email: string, name: string) {
  return fetch('https://frontend-take-home-service.fetch.com/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ email, name })
  });
}
