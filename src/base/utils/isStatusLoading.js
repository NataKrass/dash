import { LOADING } from 'store/CONSTANTS';

export default function isStatusLoading (status) {
  if (typeof(status) !== 'string') return false;
  return status === LOADING;
}
