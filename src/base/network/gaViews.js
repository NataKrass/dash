import network from 'base/network/index';

export const getGAViewIds = () => {
  return network.get('/web_views');
};
