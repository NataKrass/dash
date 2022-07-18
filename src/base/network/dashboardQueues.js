import network from 'base/network/index';

export const getDashboardQueues = (id) => {
  return network.get('/api/dashboard_queues', {
    params: {
      ga_view_id: id
    }
  });
};

export const postQueue = (body) => {
  return network.post('/api/dashboard_queues', body);
};

export const putQueue = (id, body) => {
  return network.put(`/api/dashboard_queues/${id}`, body);
};

export const deleteQueue = (id) => {
  return network.delete(`/api/dashboard_queues/${id}`);
};