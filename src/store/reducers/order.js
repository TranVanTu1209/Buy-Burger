import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../share/utility';
const initState = {
  orders: [],
  loading: false,
  purchased: false
}

// helper functions

const purchaseInit = (state, action) => {
  return updatedObject(state, { purchased: false });
}
const purchaseSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  }
  return updatedObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  })
}

const purchaseFailed = (state, action) => {
  return {
    ...state,
    loading: false,
  }
}

const fetchOrdersSuccess = (state, action) => {
  return updatedObject(state, {
    orders: action.orders,
    loading: false
  });
}
// reducer
const reducer = (state = initState, action) => {
  switch (action.type)
  {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAILED: return purchaseFailed(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false
      }
    default: return state;
  }
}

export default reducer;