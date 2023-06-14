import axios from 'axios';

axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
axios.defaults.headers.common['x-api-key'] = 'lO3xd3ddbK29tgOU4WYqezSbWmJponX5';

export const fetchBreeds = async abortCtrl => {
  const response = await axios.get('/breeds', {
    signal: abortCtrl.signal,
  });
  return response.data;
};

export const fetchDogByBreed = async breedId => {
  const response = await axios.get('/images/search', {
    params: {
      breed_id: breedId,
    },
  });
  return response.data[0];
};
