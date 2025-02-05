import fetch from 'isomorphic-unfetch';

interface SortObject {
  value: string,
  label: string,
  direction: string,
  field: string,
  icon: string
}
interface SearchObject {
  breeds?: string[],
  zipCodes?: string[],
  ageMin?: number,
  ageMax?: number,
  sortBy: SortObject,
  next: string
}

export default async function searchDogs(searchObject: SearchObject) {
  const queryParams = new URLSearchParams();

  if (searchObject.breeds) {
    searchObject.breeds.map(breed => {
      queryParams.append('breeds', breed);
    })
  }

  if (searchObject.zipCodes) {
    searchObject.zipCodes.map(zipCode => {
      queryParams.append('zipCodes', zipCode);
    })
  }

  if (searchObject.ageMin) {
    queryParams.append('ageMin', `${searchObject.ageMin}`);
  }

  if (searchObject.ageMax) {
    queryParams.append('ageMin', `${searchObject.ageMax}`);
  }

  if (searchObject.sortBy) {
    queryParams.append('sort', `${searchObject.sortBy.field}:${searchObject.sortBy.direction}`);
  }

  if (searchObject.next) {
    queryParams.set('next', searchObject.next);
  }

  return fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${queryParams}`, {
    method: 'GET',
    credentials: 'include'
  });
}
