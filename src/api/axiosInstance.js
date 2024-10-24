import axios from 'axios';
import { baseURL } from './urls';
import { removeLoggedIn } from '../features/auth/authSlice';
import { showLoader, hideLoader } from '../features/loader/loaderSlice';
import store from "../app/store";
import { alertService, severity } from '../components/snackBar/alertService';

const axiosInstance = axios.create({
  baseURL: baseURL
});


//Добавляем интерсептор запроса
axiosInstance.interceptors.request.use(
  (config) => {
      store.dispatch(showLoader());
      const token = localStorage.getItem('token');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Добавляем заголовок Authorization
      }
      return config;
  },
  (error) => {
    store.dispatch(hideLoader());
    console.log(error, "error");
    alertService.show(`Ошибка сети или сервер недоступен. Обратитесь к системному администратору.`, severity.error, 10000);
    return Promise.reject(error);
  }
);

//Добавляем интерсептор ответа
axiosInstance.interceptors.response.use(
  response => {
    store.dispatch(hideLoader());
    return response;
  },
  error => {
    const { response } = error;
    store.dispatch(hideLoader());
    if (response) {
      if (response.status === 401) {
        console.error('Ошибка 401: Необходима авторизация. Вероятно истек срок действия токена авторизации.');
        store.dispatch(removeLoggedIn());
      }
      if (response.status === 403) {
        console.error('Ошибка 403: Доступ запрещен. Недостаточно прав для использования ресурса.');
        store.dispatch(removeLoggedIn());
      }
    } else {
      console.error('Ошибка сети или сервер недоступен.');
      alertService.show("Ошибка сети или сервер недоступен. Обратитесь к системному администратору.", severity.error, 10000);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;