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
    qty: null,
    size: null,
  },
  total: null,
  transaction_id: null,
  history: [],
};

const transactionReducer = (prevState = initialState, { type, payload }) => {
  const {
    deleteCart,
    createTransaction,
    getHistory,
    deleteHistory,
    transactionData,
    pending,
    rejected,
    fulfilled,
  } = actionStrings;
  switch (type) {
    case createTransaction + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case createTransaction + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };
    case createTransaction + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        total: payload.data.data.total,
        transaction_id: payload.data.data.id,
      };

    case getHistory + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getHistory + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response?.data.msg,
      };
    case getHistory + fulfilled:
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
          size: payload.data.size,
          delivery_address: payload.data.delivery_address,
        },
        total: payload.data.total,
      };

    case deleteCart:
      return {
        ...prevState,
        cart: [],
      };

    case deleteHistory:
      return {
        ...prevState,
        history: [],
      };

    default:
      return prevState;
  }
};

export default transactionReducer;
