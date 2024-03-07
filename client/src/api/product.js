import { axiosInstance } from "./axiosInstance";

export const sellProduct = async (payload) => {
  try {
    const response = await axiosInstance.post("/create-product", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProducts = async (payload) => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getProductDetail = async (payload) => {
  try {
    const response = await axiosInstance.get(`/products/${payload}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(`/update-product`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteProduct = async (payload) => {
  try {
    const response = await axiosInstance.delete(`/delete/${payload}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const uploadImage = async (formData) => {
  try {
    const response = await axiosInstance.post(`/upload`, formData, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getSavedImages = async (payload) => {
  try {
    const response = await axiosInstance.get(`/get-images/${payload}`, {
      validateStatus: () => true
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export const deleteSavedImage = async (payload) => {
  const { productId, imgToDelete } = payload;
  const encodeImgUrl = encodeURIComponent(imgToDelete);
  try {
    const response = await axiosInstance.delete(`/product/delete/${productId}/${encodeImgUrl}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export const getApprovedProducts = async () => {
  try {
    const response = await axiosInstance.get(`/api/products`);
    return response.data;
  } catch (error) {
    return error.message;    
  }
}