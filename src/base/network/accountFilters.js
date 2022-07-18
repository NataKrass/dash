import network from './index';

export const getAllAFs = async () => {
  // return network.get('/api/account_filters').then(({data}) => data);
  return network.get('/api/account_filters');
};

export const getAFById = (id) => {
  return network.get(`/api/account_filters/${id}`);
};

export const postAFiltr = (body) => {
  return network.post('/api/account_filters', body);
};

export const putAFiltr = (id, body) => {
  return network.put(`/api/account_filters/${id}`, body);
};

export const deleteAccFiltr = (id) => {
  return network.delete(`/api/account_filters/${id}`);
};