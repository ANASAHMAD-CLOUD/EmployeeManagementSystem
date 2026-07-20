import axios from 'axios';

export const apiService = axios.create({
  baseURL: import.meta.env.VITE_EMPLOYEE_API || 'http://localhost:5050',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
