import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.65:7284/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
