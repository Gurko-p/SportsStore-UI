import axiosInstance from "./axiosInstance"
import { urls } from './urls';

export const productsApi = {
    async getProducts() {
        return axiosInstance.get(urls.products.list)
    },
    async getProduct(id) {
        return axiosInstance.get(urls.products.item(id))
    },
    async getProductsChunk(page, pageSize, filterByCategoryId) {
        return axiosInstance.get(urls.products.chunk(page, pageSize, filterByCategoryId));
    },
    async getProductsTotalCount() {
        return axiosInstance.get(urls.products.totalCount);
    },
}