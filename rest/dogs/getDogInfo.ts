export default async function getDogInfo(dogIds: string[]) {
  return fetch(`https://frontend-take-home-service.fetch.com/dogs`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dogIds),
  });
}
