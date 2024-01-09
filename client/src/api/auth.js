import { axiosInstance } from "./axiosInstance";

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/register", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/login", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const checkCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/get-current-user", {
      validateStatus: () => true
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}