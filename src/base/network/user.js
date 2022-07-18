import network from './index';

export const getUsersEdit = () => {
  return network.get('/api/user_profile');
};

export const putUser = ({ id, first_name, last_name, email }) => {
  return network.put('/api/user_profile/edit', {
    id,
    first_name,
    last_name,
    email,
  });
};
