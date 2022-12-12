import { ActionType } from 'redux-promise-middleware';

const actionStrings = {
  register: 'AUTH_REGISTER',
  login: 'AUTH_LOGIN',
  forgot: 'AUTH_FORGOT',
  reset: 'AUTH_RESET',
  logout: 'AUTH_LOGOUT',
  getUser: 'GET_USER',
  getProduct: 'GET_PRODUCT',
  getDetail: 'GET_DETAIL',
  addCart: 'ADD_TO_CHART',
  deleteCart: 'DELETE_CHART',
  toCheckout: 'CHECKOUT_PRODUCT',
  transactionData: `TRANSACTION_DATA`,
  createTransaction: `CREATE_TRANSACTION`,
  pending: `_${ActionType.Pending}`,
  fulfilled: `_${ActionType.Fulfilled}`,
  rejected: `_${ActionType.Rejected}`,
};

export default actionStrings;
