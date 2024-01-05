import { axiosInstance } from "./axiosInstance";

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/register", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
