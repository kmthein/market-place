import { axiosInstance } from "./axiosInstance"

export const savedNewDeal = async (payload) => {
    try {
        const response = await axiosInstance.post("/add-deal", payload, {
            validateStatus: () => true
        });
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const getAllDeals = async (id) => {
    try {
        const response = await axiosInstance.get(`/get-deals/${id}`, {
            validateStatus: () => true
        });
        return response.data;
    } catch (error) {
        return error.message;
    }
}