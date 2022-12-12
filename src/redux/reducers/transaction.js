import actionStrings from '../actions/actionStrings';

const initialState = {
  isLoading: false,
  isError: false,
  isFulfilled: false,
  error: '',
  cart: {
    id: '',
    price: '',
    image: '',
    productName: '',
  },
  history: [],
};

const transactionReducer = (prevState = initialState, { type, payload }) => {
  const { createTransaction, getHistory, transactionData, pending, rejected, fulfilled } =
    actionStrings;
  switch (type) {
    case createTransaction.concat(pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case createTransaction.concat(rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };
    case createTransaction.concat(fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
      };

    case getHistory.concat(pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getHistory.concat(rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };
    case getHistory.concat(fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        history: payload.data.data,
      };

    case transactionData:
      return {
        cart: {
          id: payload.data.id,
          price: payload.data.price,
          image: payload.data.image,
          productName: payload.data.productName,
          qty: payload.data.qty,
        },
      };

    default:
      return prevState;
  }
};

export default transactionReducer;
