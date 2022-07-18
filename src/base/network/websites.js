import network from './index';

export const getWebsites = () => {
  return network.get('/api/websites');
};

export const getWebsitesDeleted = () => {
  return network.get(`/api/websites/deleted`);
};

export const putWebsites = (id, body) => {
  return network.put(`/api/websites/${id}`, body);
};

export const deleteWebsites = (id) => {
  return network.delete(`/api/websites/${id}`);
};

export const activateWebsites = (id) => {
  return network.put(`api/websites/${id}/recover`);
};

export const postWebsites = (body) => {
  return network.post('/api/websites', body);
};

