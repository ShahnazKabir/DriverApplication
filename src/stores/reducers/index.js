import { combineReducers} from 'redux';
import OrderListReducer from './orderListReducer';
// import LoginReducer from './loginReducer';
import authReducer from './AuthReducer';

export default combineReducers({
  orderList: OrderListReducer,
  auth:authReducer,

});

// orderDetail.orderDetailData