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
    let message = '';
    if (response) {
      if (response.status === 401) {
        store.dispatch(removeLoggedIn());
        if(response?.config?.url?.includes('/login')){
          message = 'Ошибка 401: Неверный логин или пароль.'
          alertService.show(message, severity.error, 5000);
        }
        else{
          message = 'Ошибка 401: Неверный логин/пароль или истек срок действия токена авторизации.'
        }
        console.error(message);
      }
      if (response.status === 403) {
        store.dispatch(removeLoggedIn());
        message = 'Ошибка 403: Доступ запрещен. Недостаточно прав для использования ресурса.';
        console.error(message);
        alertService.show(message, severity.error, 5000);
      }
    } else {
      console.error('Ошибка сети или сервер недоступен.');
      alertService.show("Ошибка сети или сервер недоступен. Обратитесь к системному администратору.", severity.error, 10000);
    }
  }
);

export default axiosInstance;