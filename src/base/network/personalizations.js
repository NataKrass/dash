import network from './index';

export const getAllPersonalizations = ({ page = 1 }) => {
  return network.get('/api/personalization_campaigns', {
    params: {
      page,
      per_page: 10
    }
  });
};

export const getPersonalizationById = (id) => {
  return network.get(`/api/personalization_campaigns/${id}`);
};

export const postPersonalizations = (body) => {
  return network.post('/api/personalization_campaigns', body);
};

export const putPersonalizationStatus = (id, status) => {
  return network.put(`/api/personalization_campaigns/${id}/set_status`, status);
};

export const putPersonalizations = (id, body) => {
  return network.put(`/api/personalization_campaigns/${id}`, body);
};

export const deletePersonalizations = (id) => {
  return network.delete(`/api/personalization_campaigns/${id}`);
};

