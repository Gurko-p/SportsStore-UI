import axiosInstance from './axiosInstance';
import { urls } from './urls';

export const categoriesApi = {
    async getCategories() {
        return axiosInstance.get(urls.categories.list)
    },
    async getCategory(id) {
        return axiosInstance.get(urls.categories.category(id))
    }
}