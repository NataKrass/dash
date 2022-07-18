import network from './index';

export const getAllConversions = () => {
  return network.get('/api/conversion_campaigns');
};

export const getConversionById = (id) => {
  return network.get(`/api/conversion_campaigns/${id}`);
};

export const postConversions = (body) => {
  return network.post('/api/conversion_campaigns', body);
};

export const deleteConversions = (id) => {
  return network.delete(`/api/conversion_campaigns/${id}`);
};

export const putConversions = (id, body) => {
  return network.put(`/api/conversion_campaigns/${id}`, body);
};
