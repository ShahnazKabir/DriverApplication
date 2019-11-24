import {
  ORDER_LIST,
  ERROR, ORDER_OBJECT_SET, ORDER_DETAIL,
} from "../actions/types";


const INITIAL_STATE = {
  orderListData: [],
  errorMsg : '',
  orderObj: '',
  orderData: '',
};

export default function listReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ORDER_LIST:
      return {...state, orderListData : action.payload};
    case ORDER_OBJECT_SET:
      return {...state, orderObj: action.payload};
    case ERROR:
      return {...state, errorMsg: action.payload};
    case ORDER_DETAIL:
      return {...state, orderData: action.payload}
    default:
      return state;
  }
}