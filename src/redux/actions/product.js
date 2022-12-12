import actionStrings from './actionStrings';
import { getProduct, getProductDetail } from '../../modules/api/product';

const getProductPending = () => ({
  type: actionStrings.getProduct.concat(actionStrings.pending),
});

const getProductRejected = (error) => ({
  type: actionStrings.getProduct.concat(actionStrings.rejected),
  payload: { error },
});

const getProductFulfilled = (data) => ({
  type: actionStrings.getProduct.concat(actionStrings.fulfilled),
  payload: { data },
});

const getDetailPending = () => ({
  type: actionStrings.getDetail.concat(actionStrings.pending),
});

const getDetailRejected = (error) => ({
  type: actionStrings.getDetail.concat(actionStrings.rejected),
  payload: { error },
});

const getDetailFulfilled = (data) => ({
  type: actionStrings.getDetail.concat(actionStrings.fulfilled),
  payload: { data },
});

const getProductThunk = (cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(getProductPending());
      // console.log('redux', body);
      const result = await getProduct();
      dispatch(getProductFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(getProductRejected(error));
      // console.log(error);
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const getDetailThunk = (params, token, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(getDetailPending());
      // console.log('redux', body);
      const result = await getProductDetail(params, token);
      dispatch(getDetailFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(getDetailRejected(error));
      // console.log(error);
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const productAction = {
  getProductThunk,
  getDetailThunk,
};

export default productAction;
