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