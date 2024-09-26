import axiosInstance from "./axiosInstance"
import { urls } from './urls';

export const ordersApi = {
    async getOrders() {
        return axiosInstance.get(urls.orders.list)
    },
    async getMyOrders(userId) {
        return axiosInstance.get(urls.orders.myOrders(userId))
    },
    async createOrder(order) {
        return axiosInstance.post(urls.orders.create, order)
    },
    async createOrderCarts(order) {
        return axiosInstance.post(urls.orders.createOrderCarts, order)
    },
}