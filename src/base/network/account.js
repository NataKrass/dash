import network from './index';

export const getAccountPayment = () => {
  return network.get('/api/account/payment_info');
};

export const getAccountSubscriptions = () => {
  return network.get('/api/account/subscription');
};

export const getAllSubscriptions = () => {
  return network.get('/api/subscriptions');
};

export const getAccountDetails = () => {
  return network.get('/api/account/details');
};

export const getTimeZone = () => {
  return network.get('/api/account/timezone');
};

export const putTimeZone = () => {
  return network.put('/api/account/timezone');
};

export const postCoupon = (body) => {
  return network.post('/api/account/subscription/apply_coupon', body);
};


