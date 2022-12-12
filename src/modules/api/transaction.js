import axios from 'axios';

const config = (token) => {
  return { header: { 'x-access-token': token } };
};

const baseUrl = `${process.env.BACKEND_URL}/api/transactions`;

export const createTrans = (body, token) => axios.post(baseUrl, body, config(token));

export const getHistory = (token) => axios.get(`${baseUrl}/history`, config(token));
