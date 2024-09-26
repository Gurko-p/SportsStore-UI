import axiosInstance from "./axiosInstance"
import { urls } from './urls';

export const cartsApi = {
    async getList() {
        return axiosInstance.get(urls.carts.list)
    },

    async getCart(id) {
        return axiosInstance.get(urls.carts.item(id))
    },

    async createCart(cart) {
        return axiosInstance.post(urls.carts.create, cart)
    },
}