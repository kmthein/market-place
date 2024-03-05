import { axiosInstance } from "./axiosInstance"

export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get(`/admin/products`, {
            validateStatus: () => true
        });
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const adminActionProduct = async (payload) => {
    const {type, id} = payload;
    try {
        const response = await axiosInstance.post(`/admin-action/${type}/${id}`, {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(`/admin/users`, {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const adminUserAction = async (payload) => {
    const {type, id} = payload;
    try {
        const response = await axiosInstance.post(`/admin/user-action/${type}/${id}`, {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.message;
    }
}