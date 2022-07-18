import network from './index';

export const getIntegrations = () => {
  return network.get('api/integrations');
};