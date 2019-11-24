const driverAppUrl = {
  baseUrl : 'http://18.223.117.205:8080/',
  orderListUrl: 'api/order-masters/getAllOrdersByDeliveryType',
  driveStatusUrl: 'api/order-masters/deliveryProcessing/',
  sendLocationUrl: 'api/order-masters/',
  paymentMethodUrl: 'api/order-masters/paymentProcess/',
  blockUserUrl: 'api/block-lists/',
  orderItemDetails: 'api/order-details/byOrderMaster/',
};

export default driverAppUrl;