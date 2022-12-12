import axios from 'axios';

// const BaseUrl = process.env.BACKEND_URL;
const BaseUrl = `https://grasberg-coffee-be.vercel.app/api/v1`;
console.log(process.env.BACKEND_URL);

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
