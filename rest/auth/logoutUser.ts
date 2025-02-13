export default async function logoutUser() {
  return fetch('https://frontend-take-home-service.fetch.com/auth/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
  });
}
