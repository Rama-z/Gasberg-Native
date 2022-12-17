import axios from 'axios';

const config = (token) => {
  return {
    headers: {
      'x-access-token': `${token}`,
    },
  };
};

const baseUrl = `${process.env.API_BACKEND_URL}`;

export const createTrans = (body, token) =>
  axios.post(`${baseUrl}/transactions/createTransaction/`, body, config(token));

export const getHistory = (token) => axios.get(`${baseUrl}/history`, config(token));
