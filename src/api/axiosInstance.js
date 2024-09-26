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
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Проверяем, является ли ошибка 401
    if (error.response && error.response.status === 401) {
      // Здесь вы можете выполнить действия, например, перенаправить пользователя на страницу входа
      console.error('Ошибка 401: Неавторизованный доступ. Перенаправление на страницу входа.');
    }
    if(!localStorage.getItem("token")){
        window.location.href = '/login'
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;