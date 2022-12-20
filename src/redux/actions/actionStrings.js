import { ActionType } from 'redux-promise-middleware';

const actionStrings = {
  register: 'AUTH_REGISTER',
  login: 'AUTH_LOGIN',
  forgot: 'AUTH_FORGOT',
  reset: 'AUTH_RESET',
  logout: 'AUTH_LOGOUT',
  getUser: 'GET_USER',
  getProduct: 'GET_PRODUCT',
  getPromo: 'GET_PROMO',
  getAllProduct: 'GET_ALL_PRODUCT',
  getFood: 'GET_FOOD',
  getDetail: 'GET_DETAIL',
  addCart: 'ADD_TO_CHART',
  deleteCart: 'DELETE_CHART',
  getHistory: 'GET_HISTORY',
  deleteHistory: 'DELETE_HISTORY',
  toCheckout: 'CHECKOUT_PRODUCT',
  transactionData: `TRANSACTION_DATA`,
  createTransaction: `CREATE_TRANSACTION`,
  createProduct: 'CREATE_PRODUCT',
  editProfile: `EDIT_PROFILE`,
  pending: `_${ActionType.Pending}`,
  fulfilled: `_${ActionType.Fulfilled}`,
  rejected: `_${ActionType.Rejected}`,
};

export default actionStrings;
