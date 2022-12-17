import axios from 'axios';

const BaseUrl = process.env.API_BACKEND_URL;

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
