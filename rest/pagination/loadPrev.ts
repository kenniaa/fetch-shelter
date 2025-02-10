import fetch from 'isomorphic-unfetch';

export default async function loadPrev(prev: string) {
  return fetch(`https://frontend-take-home-service.fetch.com${prev}`, {
    method: 'GET',
    credentials: 'include'
  });
}
