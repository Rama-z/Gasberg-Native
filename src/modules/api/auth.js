import axios from 'axios';

// const BaseUrl = process.env.BACKEND_URL;
const BaseUrl = 'https://grasberg-coffee-be.vercel.app/api/v1';
// const BaseUrl = 'http://localhost:8080/api/v1';

const config = (token) => {
  return {
    headers: {
      'x-access-token': `${token}`,
    },
  };
};

export const register = (body) => {
  const URL = `${BaseUrl}/users/register`;
  return axios.post(URL, body);
};

export const login = (body) => {
  const URL = `${BaseUrl}/auth`;
  return axios.post(URL, body);
};

export const forgot = (body) => {
  const URL = `${BaseUrl}/auth/forgot-password`;
  return axios.patch(URL, body);
};

export const reset = (body) => {
  const URL = `${BaseUrl}/auth/reset-password`;
  return axios.patch(URL, body);
};

export const logout = (token) => {
  const URL = `${BaseUrl}/auth/logout`;
  console.log(URL);
  return axios.delete(URL, config(token));
};
