import { combineReducers } from 'redux';
import authReducer from './auth';
import productReducer from './product';
import userReducer from './user';

export default combineReducers({
  auth: authReducer,
  product: productReducer,
  user: userReducer,
});
