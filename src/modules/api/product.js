import axios from 'axios';

// const BaseUrl = process.env.BACKEND_URL;
const BaseUrl = `https://grasberg-coffee-be.vercel.app/api/v1`;

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

export const getProductDetail = (id) => {
  const URL = `${BaseUrl}/products/${id}`;
  return axios.get(URL, id);
};
