import axios from "axios";

const getUpdateLocalStorage = () => {
    return localStorage.getItem("token");
}

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API}`,
    headers: {
        Authorization: `Bearer ${getUpdateLocalStorage()}`
    }
})