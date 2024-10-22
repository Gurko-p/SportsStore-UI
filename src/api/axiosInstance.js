import axios from 'axios';
import { baseURL } from './urls';

const axiosInstance = axios.create({
  baseURL: baseURL
});


//Добавляем интерсептор запроса
axiosInstance.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Добавляем заголовок Authorization
      }
      return config;
  },
  (error) => {
    console.log(error, "error");
    return Promise.reject(error);
  }
);

export default axiosInstance;