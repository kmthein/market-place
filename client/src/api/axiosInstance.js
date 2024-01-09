import axios from "axios";

const getUpdateLocalStorage = () => {
    const updateToken = localStorage.getItem("token");
    console.log(updateToken);
    return updateToken;
}

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API}`,
    headers: {
        Authorization: `Bearer ${getUpdateLocalStorage()}`
    }
})