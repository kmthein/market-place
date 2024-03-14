import { axiosInstance } from "./axiosInstance"

export const pushNotification = async (payload) => {
    try {
        const response = await axiosInstance.post("/notify", payload, {
            validateStatus: () => true
        });
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const getAllNotifications = async () => {
    try {
        const response = await axiosInstance.get("/get-notification", {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const updateNotiRead = async (id) => {
    try {
        const response = await axiosInstance.get(`/noti-read/${id}`, {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const getUnreadNotiCount = async () => {
    try {
        const response = await axiosInstance.get(`/noti-count`, {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.message;
    }
}