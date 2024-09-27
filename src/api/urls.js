export const urls = {
    account: {
        register: "api/account/register",
        login: "api/account/login",
        me: "api/account/me",
    },
    categories: {
        list: "api/categories/list",
        item: (id) => `api/categories/item/${id}`,
        create: "api/categories/create",
        update: (id) => `api/categories/update/${id}`,
        remove: (id) => `api/categories/remove/${id}`
    },
    orders: {
        list: "api/orders/list",
        myOrders: (userId) => `api/orders/myOrders?userId=${userId}`,
        item: (id) => `api/orders/item/${id}`,
        create: "api/orders/create",
        createOrderCarts: "api/orders/createOrderCarts",
        update: (id) => `api/orders/update/${id}`,
        remove: (id) => `api/orders/remove/${id}`
    },
    products: {
        list: "api/products/list",
        item: (id) => `api/products/item/${id}`,
        create: "api/products/create",
        update: (id) => `api/products/update/${id}`,
        remove: (id) => `api/products/remove/${id}`,
        chunk: (page, pageSize, filterByCategoryId) => `api/products/list/chunk?page=${page}&pageSize=${pageSize}&filterByCategoryId=${filterByCategoryId}`,
        totalCount: "api/products/totalCount"
    },
    carts: {
        list: "api/carts/list",
        item: (id) => `api/carts/item/${id}`,
        create: "api/carts/create",
        update: (id) => `api/carts/update/${id}`,
        remove: (id) => `api/carts/remove/${id}`
    }
}