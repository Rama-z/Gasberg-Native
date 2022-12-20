import actionStrings from '../actions/actionStrings';

const initialState = {
  product: [],
  productAll: [],
  promo: [],
  food: [],
  detail: [],
  isLoading: false,
  isError: false,
  isFulfilled: false,
  error: null,
  status: null,
};

const productReducer = (prevState = initialState, { type, payload }) => {
  const {
    getProduct,
    getDetail,
    getAllProduct,
    getPromo,
    getFood,
    createProduct,
    pending,
    rejected,
    fulfilled,
  } = actionStrings;
  switch (type) {
    case getProduct + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getProduct + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
        product: [],
      };
    case getProduct + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        product: payload.data.data,
      };
    case getAllProduct + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getAllProduct + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
        productAll: [],
        status: payload.response?.data.status,
      };
    case getAllProduct + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        productAll: payload.data.data,
      };
    case getFood + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getFood + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
        food: [],
      };
    case getFood + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        food: payload.data.data,
      };
    case getDetail + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getDetail + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
        detail: [],
      };
    case getDetail + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        detail: payload.data.data,
      };
    case getPromo + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getPromo + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
        promo: [],
      };
    case getPromo + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        promo: payload.data.data,
      };
    case createProduct + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case createProduct + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case createProduct + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        productId: payload.data.data.id,
      };
    default:
      return prevState;
  }
};

export default productReducer;
