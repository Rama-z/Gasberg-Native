import { createTrans, getHistory as apiGetHistory } from '../../modules/api/transaction';
import actionStrings from './actionStrings';

const { createTransaction, deleteCart, transactionData, getHistory, pending, rejected, fulfilled } =
  actionStrings;

const deleteCartFulfilled = () => ({
  type: deleteCart,
});

const createTransactionPending = () => ({
  type: createTransaction + pending,
});

const createTransactionRejected = (error) => ({
  type: createTransaction + rejected,
  payload: { error },
});

const createTransactionFulfilled = (data) => ({
  type: createTransaction + fulfilled,
  payload: { data },
});

const getHistoryPending = () => ({
  type: getHistory + pending,
});

const getHistoryRejected = (error) => ({
  type: getHistory + rejected,
  payload: { error },
});

const getHistoryFulfilled = (data) => ({
  type: getHistory + fulfilled,
  payload: { data },
});

const getHistoryThunk = (token) => async (dispatch) => {
  try {
    dispatch(getHistoryPending());
    const result = await apiGetHistory(token);
    dispatch(getHistoryFulfilled(result.data));
    typeof cbSuccess === 'function' && cbSuccess();
  } catch (error) {
    dispatch(getHistoryRejected(error));
    typeof cbDenied === 'function' && cbDenied();
  }
};

const createTransactionThunk = (body, token, cbSuccess, cbDenied) => async (dispatch) => {
  try {
    dispatch(createTransactionPending());
    const result = await createTrans(body, token);
    console.log(result);
    dispatch(createTransactionFulfilled(result.data));
    typeof cbSuccess === 'function' && cbSuccess();
  } catch (error) {
    dispatch(createTransactionRejected(error));
    typeof cbDenied === 'function' && cbDenied();
  }
};

const dataTransaction = (data) => {
  return {
    type: transactionData,
    payload: { data },
  };
};
const transactionActions = {
  createTransactionThunk,
  dataTransaction,
  getHistoryThunk,
  deleteCartFulfilled,
};

export default transactionActions;
