import actionStrings from './actionStrings';
import { getUser } from '../../modules/api/user';

const getUserPending = () => ({
  type: actionStrings.getUser.concat(actionStrings.pending),
});

const getUserRejected = (error) => ({
  type: actionStrings.getUser.concat(actionStrings.rejected),
  payload: { error },
});

const getUserFulfilled = (data) => ({
  type: actionStrings.getUser.concat(actionStrings.fulfilled),
  payload: { data },
});

const getUserThunk = (token, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      console.log('user error thunk');
      dispatch(getUserPending());
      const result = await getUser(token);
      dispatch(getUserFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(getUserRejected(error));
      console.log('user error thunk2');
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const userAction = {
  getUserThunk,
};

export default userAction;
