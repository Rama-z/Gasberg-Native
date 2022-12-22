import actionStrings from '../actions/actionStrings';

const initialState = {
  profile: {
    username: null,
    first_name: null,
    last_name: null,
    display_name: null,
    genre: null,
    birthday: null,
    address: null,
    image: null,
    phone: null,
    email: null,
  },
  isLoading: false,
  isError: false,
  isFulfilled: false,
  isEditted: false,
  error: null,
};

const userReducer = (prevState = initialState, { type, payload }) => {
  const { getUser, editProfile, pending, rejected, fulfilled } = actionStrings;
  switch (type) {
    case getUser + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getUser + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload?.error.message,
        profile: {
          username: null,
          first_name: null,
          last_name: null,
          genre: null,
          birthday: null,
          address: null,
          image: null,
          phone: null,
          email: null,
        },
      };
    case getUser + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        profile: {
          username: payload?.data?.data[0].username,
          firstname: payload?.data?.data[0].firstname,
          lastname: payload?.data?.data[0].lastname,
          gender: payload?.data?.data[0].gender,
          birthday: payload?.data?.data[0].birthday,
          address: payload?.data?.data[0].address,
          image: payload?.data?.data[0].image,
          phone: payload?.data?.data[0].phone,
          email: payload?.data?.data[0].email,
        },
      };

    case editProfile + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
        isEditted: false,
      };
    case editProfile + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        isEditted: false,
        error: payload?.error.message,
        profile: {
          username: null,
          first_name: null,
          last_name: null,
          genre: null,
          birthday: null,
          address: null,
          image: null,
          phone: null,
          email: null,
        },
      };
    case editProfile + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        isEditted: true,
        // profile: {
        //   username: payload?.data?.data.username,
        //   firstname: payload?.data?.data.firstname,
        //   lastname: payload?.data?.data.lastname,
        //   gender: payload?.data?.data.gender,
        //   birthday: payload?.data?.data.birthday,
        //   address: payload?.data?.data.address,
        //   image: payload?.data?.data.image,
        //   phone: payload?.data?.data.phone,
        //   email: payload?.data?.data.email,
        // },
      };

    default:
      return prevState;
  }
};

export default userReducer;
