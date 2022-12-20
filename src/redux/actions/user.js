import actionStrings from './actionStrings';
import { getUser, editProfile } from '../../modules/api/user';

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

const editProfilePending = () => ({
  type: actionStrings.editProfile.concat(actionStrings.pending),
});

const editProfileRejected = (error) => ({
  type: actionStrings.editProfile.concat(actionStrings.rejected),
  payload: { error },
});

const editProfileFulfilled = (data) => ({
  type: actionStrings.editProfile.concat(actionStrings.fulfilled),
  payload: { data },
});

const getUserThunk = (token, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(getUserPending());
      const result = await getUser(token);
      dispatch(getUserFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(getUserRejected(error));
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const editProfileThunk = (body, token, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(editProfilePending());
      const result = await editProfile(body, token);
      dispatch(editProfileFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(editProfileRejected(error));
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const userAction = {
  getUserThunk,
  editProfileThunk,
};

export default userAction;
