import network from './index';

export const getAllCFs = async () => {
  return network.get('/api/contact_filters');
};

