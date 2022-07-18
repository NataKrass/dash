import network from './index';

export const getAllAssignRules = () => {
  return network.get('/api/auto_assignment_rules');
};

export const deleteAssignRule = (id) => {
  return network.delete(`/api/auto_assignment_rules/${id}`);
};

export const putAssignRuleById = (id, body) => {
  return network.put(`/api/auto_assignment_rules/${id}`, body);
};

export const postAssignRules = (body) => {
  return network.post('/api/auto_assignment_rules', body);
};
