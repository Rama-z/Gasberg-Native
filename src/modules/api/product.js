import axios from 'axios';

const BaseUrl = process.env.API_BACKEND_URL;

const config = (token) => {
  return {
    headers: {
      'x-access-token': `${token}`,
    },
  };
};

export const getProduct = () => {
  const URL = `${BaseUrl}/products?limit=5`;
  return axios.get(URL);
};

export const getAllProduct = (URLS) => {
  // const URL = `${BaseUrl}/products?limit=5`;
  return axios.get(URLS);
};

export const getFood = (URLS) => {
  // const URL = `${BaseUrl}/products?limit=5`;
  return axios.get(URLS);
};

export const getProductDetail = (id) => {
  const URL = `${BaseUrl}/products/${id}`;
  return axios.get(URL, id);
};

export const create = (body, token) => {
  const URL = `${BaseUrl}/products`;
  return axios.post(URL, body, config(token));
};
