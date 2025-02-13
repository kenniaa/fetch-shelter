export default async function createMatch(dogIds: string[]) {
  return await fetch(
    'https://frontend-take-home-service.fetch.com/dogs/match',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dogIds),
    },
  );
}
