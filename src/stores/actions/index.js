import {
  ORDER_LIST,
  ERROR,
  ORDER_DETAIL,
} from './types';
import urls from './../url';
import NetworkClient from './../networkClient';

const fetchList = (dispatch, orders) => {
  dispatch({
    type: ORDER_LIST,
    payload: orders,
  });
};

const setError = (dispatch, error) => {
  dispatch({
    type: ERROR,
    payload: error,
  });
};

export const getOrderList = () => (dispatch) => NetworkClient.get(urls.orderListUrl)
      .then(response => {
        fetchList(dispatch, response.data);
      })
      .catch(error => {
        setError(dispatch, error.response.data.status);
      });

export const driverStatus = (orderId, status) => (dispatch) => NetworkClient.get(urls.driveStatusUrl + orderId + '/' + status)
  .then(response => console.log(response))
  .catch(error => {
    setError(dispatch, error.response.data.status);
  });

export const driverLocationUpdate = (orderData) => (dispatch) => NetworkClient.put(urls.sendLocationUrl, orderData)
  .then(response => console.log(response))
  .catch(error => {
    setError(dispatch, error.response.data.status);
  });

export const blockUser = (userData) => (dispatch) => NetworkClient.post(urls.blockUserUrl, userData)
  .then(response => console.log(response))
  .catch(error => {
    setError(dispatch, error.response.data.status);
  });

export const paymentStatusUpdate = (orderId, status) => (dispatch) => NetworkClient.get(urls.paymentMethodUrl + orderId + '/' + status)
  .then(response => console.log(response))
  .catch(error => {
    setError(dispatch, error.response.data.status);
  });

const OrderDetail_fetch_Success = (dispatch, orderDetails) => {
  dispatch({
    type: ORDER_DETAIL,
    payload: orderDetails,
  });
};

export const getOrderDetailById = (orderId) => (dispatch) => NetworkClient.get(urls.orderItemDetails + orderId)
  .then(response => {
    OrderDetail_fetch_Success(dispatch, response.data);
  })
  .catch(error => {
    setError(dispatch, error.response.data.status);
  });


export {
  authAction,
  clearAuthStore,
  cookieToStore,
} from './authAction';


// export {
//   getOrderDetailById,
// }from './getOrderDetailById';
