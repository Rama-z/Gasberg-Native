import axios from 'axios';

const BaseUrl = process.env.API_BACKEND_URL;
const BaseUrl2 = `http://localhost:8080/api/v1`;

const config = (token) => {
  return {
    headers: {
      'x-access-token': `${token}`,
    },
  };
};

export const getUser = (token) => {
  const URL = `${BaseUrl}/users/users`;
  return axios.get(URL, config(token));
};

export const editProfile = (body, token) => {
  const URLS = `${BaseUrl}/users/editProfile`;
  return axios.patch(URLS, body, config(token));
};
