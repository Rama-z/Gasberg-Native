import actionStrings from './actionStrings';
import { register, login, forgot, reset, logout } from '../../modules/api/auth';

const registerPending = () => ({
  type: actionStrings.register.concat(actionStrings.pending),
});

const registerRejected = (error) => ({
  type: actionStrings.register.concat(actionStrings.rejected),
  payload: { error },
});

const registerFulfilled = (data) => ({
  type: actionStrings.register.concat(actionStrings.fulfilled),
  payload: { data },
});

const loginPending = () => ({
  type: actionStrings.login.concat(actionStrings.pending),
});

const loginRejected = (error) => ({
  type: actionStrings.login.concat(actionStrings.rejected),
  payload: { error },
});

const loginFulfilled = (data) => ({
  type: actionStrings.login.concat(actionStrings.fulfilled),
  payload: { data },
});

const forgotPending = () => ({
  type: actionStrings.forgot.concat(actionStrings.pending),
});

const forgotRejected = (error) => ({
  type: actionStrings.forgot.concat(actionStrings.rejected),
  payload: { error },
});

const forgotFulfilled = (data) => ({
  type: actionStrings.forgot.concat(actionStrings.fulfilled),
  payload: { data },
});

const resetPending = () => ({
  type: actionStrings.reset.concat(actionStrings.pending),
});

const resetRejected = (error) => ({
  type: actionStrings.reset.concat(actionStrings.rejected),
  payload: { error },
});

const resetFulfilled = (data) => ({
  type: actionStrings.reset.concat(actionStrings.fulfilled),
  payload: { data },
});

const logoutPending = () => ({
  type: actionStrings.logout.concat(actionStrings.pending),
});

const logoutRejected = (error) => ({
  type: actionStrings.logout.concat(actionStrings.rejected),
  payload: { error },
});

const logoutFulfilled = (data) => ({
  type: actionStrings.logout.concat(actionStrings.fulfilled),
  payload: { data },
});

const registerThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(registerPending());
      const result = await register(body);
      console.log(result);
      dispatch(registerFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(registerRejected(error));
      console.log(error);
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const loginThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(loginPending());
      const result = await login(body);
      dispatch(loginFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(loginRejected(error));
      typeof cbDenied === 'function' && cbDenied(error.response);
    }
  };
};

const forgotThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(forgotPending());
      console.log('redux', body);
      const result = await forgot(body);
      dispatch(forgotFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(forgotRejected(error));
      console.log(error);
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const resetThunk = (body, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(resetPending());
      console.log('redux', body);
      const result = await reset(body);
      dispatch(resetFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(resetRejected(error));
      console.log(error);
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const logoutThunk = (token, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(logoutPending());
      const result = await logout(token);
      dispatch(logoutFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(logoutRejected(error));
      typeof cbDenied === 'function' && cbDenied(error.response);
    }
  };
};

const authAction = {
  registerThunk,
  loginThunk,
  forgotThunk,
  resetThunk,
  logoutThunk,
};

export default authAction;
