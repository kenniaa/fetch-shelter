export default async function loadNext(next: string) {
  return fetch(`https://frontend-take-home-service.fetch.com${next}`, {
    method: 'GET',
    credentials: 'include',
  });
}
