import axios from 'axios';

const config = (token) => {
  return {
    headers: {
      'x-access-token': `${token}`,
    },
  };
};

// const baseUrl = `${process.env.BACKEND_URL}`;

const baseUrl = `https://grasberg-coffee-be.vercel.app/api/v1`;

export const createTrans = (body, token) =>
  axios.post(`${baseUrl}/transactions/createTransaction/`, body, config(token));

export const getHistory = (token) => axios.get(`${baseUrl}/history`, config(token));
