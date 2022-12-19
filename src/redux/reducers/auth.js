import actionStrings from '../actions/actionStrings';

const initialState = {
  userData: {
    id: null,
    token: null,
  },
  isLoading: false,
  isError: false,
  isFulfilled: false,
  error: null,
  screenName: null,
};

const authReducer = (prevState = initialState, { type, payload }) => {
  const { register, login, forgot, reset, logout, route, pending, rejected, fulfilled } =
    actionStrings;
  switch (type) {
    case register + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case register + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error.message,
      };
    case register + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        error: null,
      };

    case login + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case login + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case login + fulfilled:
      return {
        ...prevState,
        isError: false,
        isLoading: false,
        isFulfilled: true,
        userData: {
          id: payload.data.data.id,
          token: payload.data.data.token,
        },
      };

    case forgot + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case forgot + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case forgot + fulfilled:
      return {
        ...prevState,
        isError: false,
        isLoading: false,
        isFulfilled: true,
      };

    case reset + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case reset + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
      };
    case reset + fulfilled:
      return {
        ...prevState,
        isError: false,
        isLoading: false,
        isFulfilled: true,
      };

    case logout + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case logout + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error.message,
        userData: {
          id: null,
          token: null,
        },
      };
    case logout + fulfilled:
      return initialState;

    case route:
      return {
        ...prevState,
        screenName: payload,
      };

    default:
      return prevState;
  }
};

export default authReducer;
