import network from './index';

export const getAllHidingRules = () => {
  return network.get('/api/hiding_rules');
};

export const getHidingRuleById = (id) => {
  return network.get(`/api/hiding_rules/${id}`);
};

export const deleteHidingRule = (id) => {
  return network.delete(`/api/hiding_rules/${id}`);
};

export const postHidingRules = (google_analytics_view_id_id,
  keywords) => {
  return network.post('/api/auto_assignment_rules', {
    google_analytics_view_id_id: google_analytics_view_id_id,
    keywords: keywords,
  });
};

export const putHidingRuleById = (
  id,
  google_analytics_view_id_id,
  keywords
) => {
  return network.put(`/api/hiding_rules/${id}`, {
    google_analytics_view_id_id: google_analytics_view_id_id,
    keywords: keywords,
  });
};

