import network from './index';

export const getUsers = ({query}) => {
  return network.get('/api/users', {
    params: {
      page: 1,
      per_page: 100,
      q: query
    }
  });
};

export const deleteUsers = (id) => {
  return network.delete(`/api/users/${id}`);
};

export const putUsers = (id, body) => {
  return network.put(`/api/users/${id}`, body);
};

export const postUsers = (body) => {
  return network.post('/api/users', body);
}; 