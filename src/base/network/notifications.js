import network from './index';

export const getAllCustom = () => {
  return network.get('/api/notifications/custom');
};

export const getCustomById = (id) => {
  return network.get(`/api/notifications/custom/${id}`);
};

export const getAllSummary = () => {
  return network.get('/api/notifications/summary');
};

export const getSummaryById = (id) => {
  return network.get(`/api/notifications/summary/${id}`);
};

export const putCustomById = (id) => {
  return network.put(`/api/notifications/custom/${id}`);
};

export const putSummaryById = (id) => {
  return network.put(`/api/notifications/summary/${id}`);
};
