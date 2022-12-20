import actionStrings from '../actions/actionString';

const initialState = {
  isLoading: false,
  isError: false,
  error: '',
  promos: [],
  pagination: {},
  detail: {},
};

const promoReducer = (prevState = initialState, { type, payload }) => {
  const { getPromo, createPromo, editPromo, getPromoDetail, pending, fulfilled, rejected } =
    actionStrings;

  switch (type) {
    case getPromo.concat(pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        error: '',
      };

    case getPromo.concat(rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };

    case getPromo.concat(fulfilled):
      const newData = payload.data.data;
      const page = payload.data.meta.page;
      return {
        ...prevState,
        isLoading: false,
        promos: page > 1 ? [...prevState.promos, ...newData] : newData,
        pagination: payload.data.meta,
      };

    case createPromo.concat(pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        error: '',
      };

    case createPromo.concat(rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };

    case createPromo.concat(fulfilled):
      return {
        ...prevState,
        isLoading: false,
      };

    case getPromoDetail.concat(pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        error: '',
      };

    case getPromoDetail.concat(rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };

    case getPromoDetail.concat(fulfilled):
      return {
        ...prevState,
        isLoading: false,
        detail: {
          promo_name: payload.data.data.promo_name,
          code: payload.data.data.code,
          discount: payload.data.data.discount,
          description: payload.data.data.description,
          duration: payload.data.data.duration,
          image: payload.data.data.image,
          min_price: payload.data.data.min_price,
        },
      };

    case editPromo.concat(pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        error: '',
      };

    case editPromo.concat(rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };

    case editPromo.concat(fulfilled):
      return {
        ...prevState,
        isLoading: false,
        detail: { ...prevState.detail, ...payload.data.data },
      };

    default:
      return prevState;
  }
};

export default promoReducer;
