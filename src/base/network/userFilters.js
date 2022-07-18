import network from './index';

export const getAllUFs = async () => {
  return network.get('/api/user_filters');
};

export const getUFById = (id) => {
  return network.get(`api/user_filters/${id}`);
};

export const postUFiltr = (body) => {
  return network.post('/api/user_filters/', body);
};

export const putUFiltr = (id, body) => {
  return network.put(`/api/user_filters/${id}`, body);
};

export const deleteUFiltr = (id) => {
  return network.delete(`/api/user_filters/${id}`);
};