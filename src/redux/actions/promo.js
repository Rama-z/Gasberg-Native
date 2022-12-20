import {
  getPromos,
  createPromo as apiCreatePromo,
  editPromo as apiEditPromo,
  getPromoDetail as apiGetPromoDetail,
} from '../../modules/api/promo';
import actionStrings from './actionStrings';

const { getPromo, createPromo, editPromo, getPromoDetail, pending, rejected, fulfilled } =
  actionStrings;

const createPromoPending = () => ({
  type: createPromo.concat(pending),
});

const createPromoRejected = (error) => ({
  type: createPromo.concat(rejected),
  payload: { error },
});

const createPromoFulfilled = (data) => ({
  type: createPromo.concat(fulfilled),
  payload: { data },
});

const editPromoPending = () => ({
  type: editPromo.concat(pending),
});

const editPromoRejected = (error) => ({
  type: editPromo.concat(rejected),
  payload: { error },
});

const editPromoFulfilled = (data) => ({
  type: editPromo.concat(fulfilled),
  payload: { data },
});

const getPromoPending = () => ({
  type: getPromo.concat(pending),
});

const getPromoRejected = (error) => ({
  type: getPromo.concat(rejected),
  payload: { error },
});

const getPromoFulfilled = (data) => ({
  type: getPromo.concat(fulfilled),
  payload: { data },
});

const getPromoDetailPending = () => ({
  type: getPromoDetail.concat(pending),
});

const getPromoDetailRejected = (error) => ({
  type: getPromoDetail.concat(rejected),
  payload: { error },
});

const getPromoDetailFulfilled = (data) => ({
  type: getPromoDetail.concat(fulfilled),
  payload: { data },
});

const getPromoThunk = (query, cbSuccess, cbDenied) => async (dispatch) => {
  try {
    dispatch(getPromoPending());
    const result = await getPromos(query);
    dispatch(getPromoFulfilled(result.data));
    typeof cbSuccess === 'function' && cbSuccess();
  } catch (error) {
    console.log(error);
    dispatch(getPromoRejected(error));
    typeof cbDenied === 'function' && cbDenied();
  }
};

const createPromoThunk = (body, token, cbSuccess, cbDenied) => async (dispatch) => {
  try {
    dispatch(createPromoPending());
    const result = await apiCreatePromo(body, token);
    dispatch(createPromoFulfilled(result.data));
    typeof cbSuccess === 'function' && cbSuccess();
  } catch (error) {
    console.log(error);
    dispatch(createPromoRejected(error));
    typeof cbDenied === 'function' && cbDenied();
  }
};

const editPromoThunk = (id, body, token, cbSuccess, cbDenied) => async (dispatch) => {
  try {
    dispatch(editPromoPending());
    const result = await apiEditPromo(id, body, token);
    dispatch(editPromoFulfilled(result.data));
    typeof cbSuccess === 'function' && cbSuccess();
  } catch (error) {
    console.log(error);
    dispatch(editPromoRejected(error));
    typeof cbDenied === 'function' && cbDenied();
  }
};

const getPromoDetailThunk = (id, token, cbSuccess, cbDenied) => async (dispatch) => {
  try {
    dispatch(getPromoDetailPending());
    const result = await apiGetPromoDetail(id, token);
    dispatch(getPromoDetailFulfilled(result.data));
    typeof cbSuccess === 'function' && cbSuccess();
  } catch (error) {
    console.log(error);
    dispatch(getPromoDetailRejected(error));
    typeof cbDenied === 'function' && cbDenied();
  }
};

const promoActions = {
  getPromoThunk,
  createPromoThunk,
  editPromoThunk,
  getPromoDetailThunk,
};

export default promoActions;
