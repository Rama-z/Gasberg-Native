import axios from 'axios';

const config = (token) => {
  return {
    headers: {
      'x-access-token': `${token}`,
    },
  };
};

const baseUrl = `${process.env.API_BACKEND_URL}/promos`;

export const getPromos = (query) => {
  axios.get(baseUrl, { params: query });
};

export const createPromo = (body, token) => {
  return axios.post(baseUrl, body, config(token));
};

export const getPromoDetail = (id, token) => {
  axios.get(baseUrl.concat('/', id), config(token));
};

export const editPromo = (id, body, token) => {
  axios.patch(baseUrl.concat('/', id), body, config(token));
};
