import { axiosInstance } from "./axiosInstance"

export const sellProduct = async (payload) => {
    try {
        const response = await axiosInstance.post("/create-product", payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getProducts = async (payload) => {
    try {
        const response = await axiosInstance.get("/products");
        return response.data;
    } catch (error) {
        return error.message;
    }
}