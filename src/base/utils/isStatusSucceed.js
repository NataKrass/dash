import { SUCCEED } from 'store/CONSTANTS';

export default function isStatusSucceed (status) {
  if (typeof(status) !== 'string') return false;
  return status === SUCCEED;
}

