import axiosInstance from "./axiosInstance"
import { urls } from './urls';

export const authAPI = {
    async logInGetToken(email, password) {
        return axiosInstance.post(urls.account.login, { "email": email, "password": password });
    },

    async getUserData() {
        return axiosInstance.get(urls.account.me);
    },
}