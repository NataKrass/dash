import axios from 'axios';

const NOT_ACCEPTABLE = 406;

const network = axios.create({
  baseURL: process.env.REACT_APP_API_PATH,
  withCredentials: true,
  timeout: 100000,
  xsrfCookieName: 'CSRF-TOKEN',
  xsrfHeaderName: 'X-CSRF-Token',
  headers: {
    'Accept': 'application/json',
  },
  validateStatus(status) {
    if (status === NOT_ACCEPTABLE) {
      window.location.assign(process.env.REACT_APP_API_PATH);
      return status;
    }
    return status >= 200 && status < 300; // default
  },
});

export default network;
