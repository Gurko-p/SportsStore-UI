import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/`
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


axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        // Редирект на страницу входа
        console.error('Ошибка 401: Неавторизованный доступ. Перенаправление на страницу входа.');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;