import actionStrings from './actionStrings';
import { getProduct, getProductDetail, getAllProduct } from '../../modules/api/product';

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

const getAllProductPending = () => ({
  type: actionStrings.getAllProduct.concat(actionStrings.pending),
});

const getAllProductRejected = (error) => ({
  type: actionStrings.getAllProduct.concat(actionStrings.rejected),
  payload: { error },
});

const getAllProductFulfilled = (data) => ({
  type: actionStrings.getAllProduct.concat(actionStrings.fulfilled),
  payload: { data },
});

const getAllPromoPending = () => ({
  type: actionStrings.getPromo.concat(actionStrings.pending),
});

const getAllPromoRejected = (error) => ({
  type: actionStrings.getPromo.concat(actionStrings.rejected),
  payload: { error },
});

const getAllPromoFulfilled = (data) => ({
  type: actionStrings.getPromo.concat(actionStrings.fulfilled),
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
      const result = await getProduct();
      dispatch(getProductFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(getProductRejected(error));
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const getAllProductThunk = (URLS, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(getAllProductPending());
      const result = await getAllProduct(URLS);
      dispatch(getAllProductFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(getAllProductRejected(error));
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const getAllPromoThunk = (URLS, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(getAllPromoPending());
      const result = await getAllProduct(URLS);
      dispatch(getAllPromoFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(getAllPromoRejected(error));
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const getDetailThunk = (params, token, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(getDetailPending());
      const result = await getProductDetail(params, token);
      dispatch(getDetailFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(getDetailRejected(error));
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const productAction = {
  getProductThunk,
  getDetailThunk,
  getAllProductThunk,
  getAllPromoThunk,
};

export default productAction;
