import fetch from 'isomorphic-unfetch';

export default async function getDogBreeds() {
  return fetch(`https://frontend-take-home-service.fetch.com/dogs/breeds`, {
    method: 'GET',
    credentials: 'include'
  });
}
